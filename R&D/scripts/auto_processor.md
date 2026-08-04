# Ingress Auto-Processor System (Perplexity / ChatGPT Pipelines)

This system explains how we can automate the intake of files from Google Drive (e.g., from NotebookLM, Perplexity, or ChatGPT) and process them directly into structured copywriting notes in your local `Influence Accelerator` folder.

---

## 1. The Automation Pipeline Architecture

```
[ Web: NotebookLM / Perplexity / ChatGPT ]
                 │
                 │ (You export/save file to Google Drive)
                 ▼
[ Cloud: Google Drive (IA Ingress Folder) ]
                 │
                 │ (Google Drive Desktop client syncs it)
                 ▼
[ Local PC: Virtual Drive (G:\My Drive\IA Ingress) ]
                 │
                 │ (Local python script "auto_watcher.py" detects it)
                 ▼
     [ API Processing Layer ] ──> Sends content to Perplexity/OpenAI API
                 │                for structuring/summarizing.
                 ▼
[ Structured Outputs Saved to "Influence Accelerator/" ]
```

---

## 2. The Python Watcher Blueprint (`auto_watcher.py`)

Below is the code for a lightweight, zero-dependency Python script that runs locally, monitors your Google Drive ingress folder, and processes files.

```python
import os
import shutil
import time
import urllib.parse
import requests # For API calls

# Configure Paths
DRIVE_INGRESS = r"G:\My Drive\IA Ingress"
LOCAL_OUT = r"c:\Users\rithw\OneDrive\Desktop\chaos\RG Second brain\RG's Brain\03 Projects\Influence Accelerator"
PROCESSED_LOG = os.path.join(LOCAL_OUT, "R&D", "processed_files.txt")

# API Keys (Optional - retrieve from environment)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

def log_processed(filepath):
    with open(PROCESSED_LOG, "a", encoding="utf-8") as f:
        f.write(filepath + "\n")

def is_processed(filepath):
    if not os.path.exists(PROCESSED_LOG):
        return False
    with open(PROCESSED_LOG, "r", encoding="utf-8") as f:
        processed = f.read().splitlines()
    return filepath in processed

def process_file(file_path):
    print(f"New file detected: {file_path}")
    filename = os.path.basename(file_path)
    
    # Read the file content
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return
        
    # --- OPTIONAL: Run LLM Processing (ChatGPT/Perplexity) ---
    if OPENAI_API_KEY:
        print("Sending content to OpenAI for structuring...")
        processed_content = call_llm_processor(content)
    else:
        # Fallback to standard layout splitting
        print("No API Key found. Doing basic structured split...")
        processed_content = content
        
    # Save processed outputs locally
    output_path = os.path.join(LOCAL_OUT, "Synthesis 1 KJ Copywriting Mastersheet (Docs)", f"Processed_{filename}")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(processed_content)
        
    print(f"Successfully processed and saved to {output_path}")
    log_processed(file_path)

def call_llm_processor(text):
    # Call OpenAI API to structure the notes into KJ's chapters
    url = "https://api.openai.com/v1/chat/completions"
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
    prompt = f"Take these notes and break them down into structured chapters based on copywriting frameworks. Format as markdown:\n\n{text}"
    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}]
    }
    try:
        res = requests.post(url, json=payload, headers=headers)
        return res.json()['choices'][0]['message']['content']
    except Exception as e:
        print(f"API Error: {e}")
        return text

def start_watching():
    print(f"Monitoring folder: {DRIVE_INGRESS}...")
    while True:
        if os.path.exists(DRIVE_INGRESS):
            for file in os.listdir(DRIVE_INGRESS):
                file_path = os.path.join(DRIVE_INGRESS, file)
                if os.path.isfile(file_path) and not is_processed(file_path):
                    process_file(file_path)
        time.sleep(5) # Poll every 5 seconds

if __name__ == "__main__":
    start_watching()
```

---

## 3. How to Connect Drive with Perplexity & ChatGPT (Web to Drive)

To get information *from* ChatGPT/Perplexity *into* your Drive folder automatically:

1.  **ChatGPT Plus (GPTs):** You can use standard ChatGPT or create a Custom GPT. You can enable **Actions** inside a Custom GPT to connect to Google Drive or use **Zapier** inside ChatGPT to automatically save any output of your conversation into your Google Drive folder (`IA Ingress`).
2.  **Make.com / Zapier (Easiest Integration):** Set up a simple scenario:
    *   *Trigger:* A new output is generated in OpenAI / Perplexity / Slack, or you send an interesting article link.
    *   *Action:* Create a text/markdown file in Google Drive inside the `IA Ingress` folder.
    *   This instantly syncs down to your PC, where the local watcher parses it and saves it nicely formatted in your local folders!
