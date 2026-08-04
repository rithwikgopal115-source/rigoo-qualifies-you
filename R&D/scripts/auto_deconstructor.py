import os
import shutil
import time
import json
import re
import urllib.request

# Configure Paths relative to R&D folder
RD_DIR = r"c:\Users\rithw\OneDrive\Desktop\chaos\RG Second brain\RG's Brain\03 Projects\Influence Accelerator\R&D"
COLLECTED_RAW = os.path.join(RD_DIR, "1. collected raw inputs")
SORTED_RAW = os.path.join(RD_DIR, "2. sorted raw inputs")
STANDARDIZED = os.path.join(RD_DIR, "3. standardized macro systems")
PROCESSED_LOG = os.path.join(RD_DIR, "scripts", "processed_files.txt")

os.makedirs(COLLECTED_RAW, exist_ok=True)
os.makedirs(SORTED_RAW, exist_ok=True)
os.makedirs(STANDARDIZED, exist_ok=True)
os.makedirs(os.path.dirname(PROCESSED_LOG), exist_ok=True)

def log_processed(filepath):
    with open(PROCESSED_LOG, "a", encoding="utf-8") as f:
        f.write(filepath + "\n")

def is_processed(filepath):
    if not os.path.exists(PROCESSED_LOG):
        return False
    with open(PROCESSED_LOG, "r", encoding="utf-8") as f:
        processed = f.read().splitlines()
    return filepath in processed

def split_pdf(pdf_path, output_dir, doc_name):
    """Splits PDF every 5 pages and extracts corresponding text to Markdown."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        print(f" -> Splitting PDF: {total_pages} pages found.")
        
        chunk_size = 5
        part_num = 1
        
        for start_page in range(0, total_pages, chunk_size):
            end_page = min(start_page + chunk_size, total_pages)
            writer = PdfWriter()
            chunk_text = ""
            
            for page_num in range(start_page, end_page):
                page = reader.pages[page_num]
                writer.add_page(page)
                # Try to extract text for the markdown file
                page_text = page.extract_text()
                if page_text:
                    chunk_text += page_text + "\n"
            
            # Save split PDF chunk
            chunk_pdf_name = f"{doc_name}_Part_{part_num}.pdf"
            chunk_pdf_path = os.path.join(output_dir, chunk_pdf_name)
            with open(chunk_pdf_path, "wb") as f_out:
                writer.write(f_out)
                
            # Save corresponding MD text chunk
            chunk_md_name = f"{doc_name}_Part_{part_num}.md"
            chunk_md_path = os.path.join(output_dir, chunk_md_name)
            with open(chunk_md_path, "w", encoding="utf-8") as f_md:
                # Add heading and original page range
                header = f"# {doc_name} - Part {part_num}\n"
                header += f"*Source pages: {start_page + 1} to {end_page}*\n\n"
                f_md.write(header + chunk_text)
                
            print(f"   -> Created: {chunk_pdf_name} and {chunk_md_name}")
            part_num += 1
            
        return True
    except Exception as e:
        print(f"Error splitting PDF: {e}")
        return False

def split_markdown(md_path, output_dir, doc_name):
    """Splits Markdown file every ~2500 words at a logical paragraph break."""
    try:
        with open(md_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        paragraphs = content.split("\n\n")
        chunks = []
        current_chunk = []
        current_word_count = 0
        
        for para in paragraphs:
            words = para.split()
            current_chunk.append(para)
            current_word_count += len(words)
            
            if current_word_count >= 2500:
                chunks.append("\n\n".join(current_chunk))
                current_chunk = []
                current_word_count = 0
                
        if current_chunk:
            chunks.append("\n\n".join(current_chunk))
            
        print(f" -> Splitting Markdown: {len(chunks)} chunks created.")
        
        for i, chunk in enumerate(chunks, start=1):
            chunk_name = f"{doc_name}_Part_{i}.md"
            chunk_path = os.path.join(output_dir, chunk_name)
            with open(chunk_path, "w", encoding="utf-8") as f_out:
                f_out.write(f"# {doc_name} - Part {i}\n\n{chunk}")
            print(f"   -> Created: {chunk_name}")
            
        return True
    except Exception as e:
        print(f"Error splitting Markdown: {e}")
        return False

def process_file(file_path):
    filename = os.path.basename(file_path)
    print(f"\nDetecting new file in sorted raw inputs: {filename}")
    
    # Exclude directories and processing logs/chunks folders
    if not os.path.isfile(file_path):
        return
        
    doc_name = os.path.splitext(filename)[0]
    # Create target folder for the deconstructed parts
    output_dir = os.path.join(SORTED_RAW, f"{doc_name} (Chopped)")
    os.makedirs(output_dir, exist_ok=True)
    
    # 1. Handle Google Doc shortcuts (.gdoc)
    if filename.endswith('.gdoc'):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                gdoc_data = json.load(f)
            url = gdoc_data.get('url', '')
            
            match = re.search(r'/d/([a-zA-Z0-9-_]+)', url)
            if match:
                doc_id = match.group(1)
                temp_pdf = os.path.join(output_dir, f"{doc_name}_original.pdf")
                
                # Download as PDF
                download_url = f"https://docs.google.com/document/d/{doc_id}/export?format=pdf"
                print(f" -> Downloading Google Doc as PDF...")
                urllib.request.urlretrieve(download_url, temp_pdf)
                
                # Split the downloaded PDF
                split_pdf(temp_pdf, output_dir, doc_name)
                
                # Remove the original downloaded PDF to leave only chunks
                if os.path.exists(temp_pdf):
                    os.remove(temp_pdf)
                
                log_processed(file_path)
        except Exception as e:
            print(f"Error processing Google Doc: {e}")

    # 2. Handle PDF files
    elif filename.endswith('.pdf'):
        # Split PDF every 5 pages and extract md
        success = split_pdf(file_path, output_dir, doc_name)
        if success:
            log_processed(file_path)

    # 3. Handle Text/Markdown files
    elif filename.endswith(('.txt', '.md', '.markdown')):
        success = split_markdown(file_path, output_dir, doc_name)
        if success:
            log_processed(file_path)

def start_watching():
    print(f"Deconstructor Watcher active.")
    print(f"Monitoring folder: {SORTED_RAW}")
    print("Drop files to automatically deconstruct them. Press Ctrl+C to stop.")
    
    while True:
        try:
            if os.path.exists(SORTED_RAW):
                for file in os.listdir(SORTED_RAW):
                    # Skip the output chopped folders
                    if file.endswith(" (Chopped)"):
                        continue
                    file_path = os.path.join(SORTED_RAW, file)
                    if os.path.isfile(file_path) and not is_processed(file_path):
                        process_file(file_path)
            time.sleep(5)
        except KeyboardInterrupt:
            print("\nWatcher stopped.")
            break
        except Exception as e:
            print(f"Watcher loop error: {e}")
            time.sleep(10)

if __name__ == "__main__":
    start_watching()
