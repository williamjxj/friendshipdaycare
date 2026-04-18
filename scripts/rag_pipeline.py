"""
rag_pipeline.py — Scrape → Chunk → Embed → RAG → Serve
All-in-one for friendshipdaycare.com

Install:
    pip install playwright beautifulsoup4 openai chromadb fastapi uvicorn
    playwright install chromium

Steps:
    python rag_pipeline.py scrape     # crawl site → save pages
    python rag_pipeline.py build      # chunk + embed → Chroma DB
    python rag_pipeline.py serve      # run FastAPI chat endpoint
"""

import asyncio
import json
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.friendshipdaycare.com"
PAGES_FILE = Path("pages.json")
CHROMA_DIR = "./chroma_db"
COLLECTION = "friendshipdaycare"


# ─────────────────────────────────────────────
# STEP 1: SCRAPE
# ─────────────────────────────────────────────
async def scrape():
    from playwright.async_api import async_playwright
    from bs4 import BeautifulSoup

    visited, to_visit, pages = set(), {BASE_URL}, []

    def clean(html, url):
        soup = BeautifulSoup(html, "html.parser")
        for t in soup.select("nav,header,footer,script,style,iframe"):
            t.decompose()
        title = soup.title.string.strip() if soup.title else url
        main = soup.find("main") or soup.find("article") or soup.find("body")
        text = "\n\n".join(s.strip() for s in main.stripped_strings if s.strip()) if main else ""
        return {"url": url, "title": title, "text": text}

    def links(html, cur):
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(html, "html.parser")
        out = set()
        for a in soup.find_all("a", href=True):
            full = urljoin(cur, a["href"])
            p = urlparse(full)
            if p.netloc == urlparse(BASE_URL).netloc and p.scheme in ("http","https"):
                out.add(full.split("#")[0].rstrip("/"))
        return out

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.route("**/*.{png,jpg,jpeg,gif,svg,woff,woff2}", lambda r: r.abort())

        while to_visit:
            url = to_visit.pop()
            if url in visited: continue
            visited.add(url)
            print(f"  → {url}")
            try:
                await page.goto(url, wait_until="domcontentloaded", timeout=15000)
                html = await page.content()
                data = clean(html, url)
                if data["text"]:
                    pages.append(data)
                to_visit.update(links(html, url) - visited)
            except Exception as e:
                print(f"    ⚠ {e}")

        await browser.close()

    PAGES_FILE.write_text(json.dumps(pages, indent=2, ensure_ascii=False))
    print(f"\n✅ Scraped {len(pages)} pages → {PAGES_FILE}")


# ─────────────────────────────────────────────
# STEP 2: CHUNK + EMBED → CHROMA
# ─────────────────────────────────────────────
def build():
    import chromadb
    from openai import OpenAI

    client = OpenAI()
    chroma = chromadb.PersistentClient(path=CHROMA_DIR)
    col = chroma.get_or_create_collection(COLLECTION)

    pages = json.loads(PAGES_FILE.read_text())

    def chunk(text, size=400, overlap=50):
        words = text.split()
        chunks = []
        i = 0
        while i < len(words):
            chunks.append(" ".join(words[i:i+size]))
            i += size - overlap
        return chunks

    docs, metas, ids = [], [], []
    for page in pages:
        for i, chunk_text in enumerate(chunk(page["text"])):
            docs.append(chunk_text)
            metas.append({"url": page["url"], "title": page["title"]})
            ids.append(f"{page['url']}__chunk{i}")

    print(f"  Embedding {len(docs)} chunks...")
    resp = client.embeddings.create(model="text-embedding-3-small", input=docs)
    embeddings = [r.embedding for r in resp.data]

    col.add(documents=docs, embeddings=embeddings, metadatas=metas, ids=ids)
    print(f"✅ Built Chroma DB → {CHROMA_DIR}  ({len(docs)} chunks)")


# ─────────────────────────────────────────────
# STEP 3: FASTAPI CHAT ENDPOINT
# ─────────────────────────────────────────────
def serve():
    import chromadb
    from openai import OpenAI
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import uvicorn

    app = FastAPI()
    app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

    client = OpenAI()
    chroma = chromadb.PersistentClient(path=CHROMA_DIR)
    col = chroma.get_collection(COLLECTION)

    class Query(BaseModel):
        question: str

    @app.post("/chat")
    def chat(q: Query):
        # Embed the question
        emb = client.embeddings.create(model="text-embedding-3-small", input=[q.question])
        vec = emb.data[0].embedding

        # Retrieve top 4 chunks
        results = col.query(query_embeddings=[vec], n_results=4)
        chunks = results["documents"][0]
        sources = [m["url"] for m in results["metadatas"][0]]
        context = "\n\n---\n\n".join(chunks)

        # Generate answer
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": (
                    "You are a helpful assistant for Friendship Daycare. "
                    "Answer questions using only the context provided. "
                    "Be friendly and concise."
                )},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {q.question}"}
            ]
        )
        return {
            "answer": resp.choices[0].message.content,
            "sources": list(set(sources))
        }

    @app.get("/health")
    def health():
        return {"status": "ok"}

    print("🚀 Serving at http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)


# ─────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────
if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "help"
    if cmd == "scrape":
        asyncio.run(scrape())
    elif cmd == "build":
        build()
    elif cmd == "serve":
        serve()
    else:
        print("Usage: python rag_pipeline.py [scrape | build | serve]")
