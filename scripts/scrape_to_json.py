"""
Playwright scraper → static JSON for friendshipdaycare.com
No RAG, no LLM. Just clean structured data you can use directly.

Usage:
    pip install playwright beautifulsoup4
    playwright install chromium
    python scrape_to_json.py

Output: site_content.json
"""

import asyncio
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

BASE_URL = "https://www.friendshipdaycare.com"
OUTPUT_FILE = Path("site_content.json")

visited = set()
to_visit = {BASE_URL}
results = []


def extract_page_data(html: str, url: str) -> dict:
    """Extract structured data from a page."""
    soup = BeautifulSoup(html, "html.parser")

    # Remove noise
    for tag in soup.select("nav, header, footer, script, style, iframe, noscript"):
        tag.decompose()

    title = soup.title.string.strip() if soup.title else ""
    slug = urlparse(url).path.strip("/") or "home"

    # Meta description
    meta = soup.find("meta", attrs={"name": "description"})
    description = meta["content"].strip() if meta and meta.get("content") else ""

    # Headings
    headings = [h.get_text(strip=True) for h in soup.find_all(["h1", "h2", "h3"]) if h.get_text(strip=True)]

    # Main body text
    main = soup.find("main") or soup.find("article") or soup.find("body")
    paragraphs = []
    if main:
        for p in main.find_all("p"):
            text = p.get_text(strip=True)
            if text:
                paragraphs.append(text)

    # Images with alt text
    images = []
    for img in soup.find_all("img", src=True):
        images.append({
            "src": urljoin(url, img["src"]),
            "alt": img.get("alt", "").strip()
        })

    # Internal links on this page
    links = []
    for a in soup.find_all("a", href=True):
        full = urljoin(url, a["href"])
        if urlparse(full).netloc == urlparse(BASE_URL).netloc:
            links.append({
                "text": a.get_text(strip=True),
                "href": full.split("#")[0]
            })

    return {
        "url": url,
        "slug": slug,
        "title": title,
        "description": description,
        "headings": headings,
        "paragraphs": paragraphs,
        "images": images,
        "links": links,
    }


def extract_internal_links(html: str, current_url: str) -> set:
    soup = BeautifulSoup(html, "html.parser")
    links = set()
    for a in soup.find_all("a", href=True):
        full = urljoin(current_url, a["href"])
        parsed = urlparse(full)
        if parsed.netloc == urlparse(BASE_URL).netloc and parsed.scheme in ("http", "https"):
            links.add(full.split("#")[0].rstrip("/"))
    return links


async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.route("**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf}", lambda r: r.abort())

        while to_visit:
            url = to_visit.pop()
            if url in visited:
                continue
            visited.add(url)

            print(f"  Scraping: {url}")
            try:
                await page.goto(url, wait_until="domcontentloaded", timeout=15000)
                html = await page.content()
            except Exception as e:
                print(f"    ⚠ Failed: {e}")
                continue

            data = extract_page_data(html, url)
            results.append(data)
            print(f"    ✓ {data['title']} — {len(data['paragraphs'])} paragraphs")

            new_links = extract_internal_links(html, url)
            to_visit.update(new_links - visited)

        await browser.close()

    # Save everything to one JSON file
    output = {
        "site": BASE_URL,
        "total_pages": len(results),
        "pages": results
    }
    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n✅ Done! {len(results)} pages → {OUTPUT_FILE}")


if __name__ == "__main__":
    asyncio.run(scrape())
