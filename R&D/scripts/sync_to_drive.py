import os
import shutil
import sys

# Define source and destination paths
source_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # points to the R&D folder
# Find Google Drive virtual drive letter (typically G:, but check others if not found)
possible_drives = [f"{letter}:\\My Drive" for letter in ["G", "H", "I", "J", "F", "D"]]
target_base = None

for path in possible_drives:
    if os.path.exists(path):
        target_base = path
        break

if not target_base:
    print("Error: Google Drive virtual folder ('My Drive') not found. Please make sure Google Drive for Desktop is running and you are logged in.")
    sys.exit(1)

target_dir = os.path.join(target_base, "IA R&D")
os.makedirs(target_dir, exist_ok=True)

print(f"Syncing files from {source_dir} to {target_dir}...")

# Copy files
for item in os.listdir(source_dir):
    s = os.path.join(source_dir, item)
    d = os.path.join(target_dir, item)
    
    # Exclude script directory itself
    if item == "scripts":
        continue
        
    if os.path.isdir(s):
        if os.path.exists(d):
            shutil.rmtree(d)
        shutil.copytree(s, d)
        print(f"Synced directory: {item}")
    elif os.path.isfile(s):
        shutil.copy2(s, d)
        print(f"Synced file: {item}")

print("Sync completed successfully!")
