## Option 1 — Static JSON (No LLM)

```
scrape_to_json.py  →  public/site_content.json  →  DaycareChat.tsx
```

- Scrape site → one `site_content.json` in `/public`
- Next.js loads it via `fetch("/site_content.json")` — **no backend**
- Keyword matching only, answers come from raw scraped paragraphs
- **Free, instant, zero API cost**
- Dumb: can't understand natural language or synonyms

---

## Option 2 — Embeddings + DeepSeek V3 (With LLM)

```
scrape_to_json.py  →  json_rag.py build  →  embeddings.json
                       json_rag.py serve  →  FastAPI :8000  →  DaycareChat.tsx
```

- Same `site_content.json` as input
- `build`: chunks + embeds with `text-embedding-3-small` → cached `embeddings.json`
- `serve`: cosine similarity search (numpy, no Chroma) → DeepSeek V3 generates answer
- Next.js calls `fetch("http://localhost:8000/chat")`
- **Costs ~$0.001/query, needs both API keys**
- Smart: natural language, handles vague questions, proper sentences

---

## Quick Comparison

| | Option 1 | Option 2 |
|---|---|---|
| **Backend** | None | FastAPI + Python |
| **LLM** | ❌ | DeepSeek V3 |
| **Cost** | Free | ~$0.001/query |
| **Answer quality** | Keyword match | Natural language |
| **Setup** | 1 command | 3 commands |
| **Best for** | Simple FAQ | Real chatbot |

**Recommendation:** Start with Option 1 to verify your scraped data is good, then upgrade to Option 2 for production.