import os

workspace_dir = r"d:\ATC\Neeki_web\assets"
large_files = []
for root, dirs, files in os.walk(workspace_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            path = os.path.join(root, f)
            if os.path.getsize(path) > 200 * 1024:
                large_files.append(path)

print(f"Found {len(large_files)} large files.")
for f in large_files:
    print(f)
