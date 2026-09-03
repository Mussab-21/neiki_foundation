import subprocess
import sys

try:
    subprocess.run(["git", "add", "impact.html", "Mobile_UI-UX/impact.html", "assets/Phase 1.  ISLD donated Projects/"], check=True)
    subprocess.run(["git", "commit", "-m", "fix: Correct broken image paths and optimize Phase 1 gallery to WebP"], check=True)
    print("Git commit successful.")
except subprocess.CalledProcessError as e:
    print(f"Git command failed: {e}")
    sys.exit(1)
