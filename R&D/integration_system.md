# R&D Folder & Knowledge Sync System (NotebookLM & Perplexity)

This folder is your research and development (R&D) hub. Below is the operational workflow for connecting your local workspace with NotebookLM and Perplexity.

## NotebookLM Local Folder Integration

NotebookLM currently runs as a web application and does not have a native local API. However, you can achieve **automatic local-to-cloud syncing** using the Google Drive desktop client:

### Sync Setup (Google Drive Desktop)
1. Install **Google Drive for Desktop** on your Windows machine.
2. Set up your Drive to sync the `Influence Accelerator` workspace (or specifically this `R&D` subfolder) with a dedicated Google Drive folder (e.g. `IA R&D`).
3. In **NotebookLM**, create a notebook and add the source by choosing **Google Drive**, then select the synced `IA R&D` folder.
4. Whenever you add local markdown files, scripts, or PDFs to this folder, they will automatically sync to Google Drive, allowing you to quickly refresh the sources in NotebookLM.

---

## Perplexity Research Integration

To connect local files with Perplexity, or to script automated research directly into this folder, we can use the Perplexity API.

### Automated Perplexity Research Script (`research.py`)
Below is a simple script structure you can run to query Perplexity and save the researched concepts directly into this folder as markdown files:

```python
import os
import requests

def query_perplexity(prompt: str, api_key: str):
    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Bearer {api_key}"
    }
    payload = {
        "model": "sonar-reasoning", # Deep reasoning search model
        "messages": [
            {"role": "system", "content": "You are a world-class marketing R&D researcher. Extract insights from search."},
            {"role": "user", "content": prompt}
        ]
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return response.json()['choices'][0]['message']['content']

def save_research(topic: str, content: str):
    filename = f"{topic.lower().replace(' ', '_')}.md"
    filepath = os.path.join("R&D", filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# Research: {topic}\n\n{content}")
    print(f"Saved research to {filepath}")
```

## Folder Structure

Use this folder to drop:
*   `R&D/raw_notes/` - Rough thoughts, voice-to-text transcriptions, and raw ideas.
*   `R&D/synthesis/` - Structured research outputs from NotebookLM/Perplexity.
*   `R&D/scripts/` - Automated scraping, processing, or API querying scripts.
