import os
import re

report = []
report.append("Starting final validation of React + TypeScript project files...")
report.append("=" * 60)

files_to_check = [
    "index.html",
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "src/main.tsx",
    "src/App.tsx",
    "src/index.css",
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/components/Inicio.tsx",
    "src/components/Municipio.tsx",
    "src/components/Transparencia.tsx",
    "src/components/Obras.tsx",
    "src/components/Contacto.tsx"
]

all_ok = True

for f in files_to_check:
    if os.path.exists(f):
        report.append(f"SUCCESS: File {f} exists. Size: {os.path.getsize(f)} bytes.")
    else:
        report.append(f"ERROR: File {f} does NOT exist.")
        all_ok = False

# Check if logo exists in public assets
logo_path = "public/assets/img/escudo.png"
if os.path.exists(logo_path):
    report.append(f"SUCCESS: Official logo asset exists at {logo_path}. Size: {os.path.getsize(logo_path)} bytes.")
else:
    report.append(f"ERROR: Official logo asset does NOT exist at {logo_path}!")
    all_ok = False

# Check if build output exists
dist_html = "dist/index.html"
if os.path.exists(dist_html):
    report.append(f"SUCCESS: Build output folder and {dist_html} exist!")
else:
    report.append(f"ERROR: Build folder or {dist_html} is missing!")
    all_ok = False

# Search for any emojis in TSX/TS/CSS source code
source_files = []
for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css")):
            source_files.append(os.path.join(root, file))

emoji_pattern = re.compile(
    "["
    "\U00010000-\U0010ffff"  # All astronomical and supplementary characters (includes emojis)
    "\u2600-\u27bf"          # Dingbats and Miscellaneous symbols
    "\u2300-\u23ff"          # Miscellaneous Technical
    "\u2b50"                 # Star
    "]",
    re.UNICODE
)

found_emojis = False
for sf in source_files:
    try:
        with open(sf, "r", encoding="utf-8") as file:
            content = file.read()
        matches = emoji_pattern.findall(content)
        if matches:
            report.append(f"ERROR: Found emoji(s) {matches} in source file {sf}!")
            found_emojis = True
            all_ok = False
    except Exception as e:
        report.append(f"Error reading file {sf}: {e}")

if not found_emojis:
    report.append("SUCCESS: Cero emojis found in all source code files (TSX, TS, CSS)!")

report.append("=" * 60)
if all_ok:
    report.append("SUCCESS: ALL REACT + TYPESCRIPT VERIFICATIONS PASSED SUCCESSFULLY!")
else:
    report.append("WARNING: SOME VERIFICATIONS FAILED. Please review the errors above.")

with open("verification_report_react.txt", "w", encoding="utf-8") as out:
    out.write("\n".join(report))
print("Wrote report to verification_report_react.txt successfully!")
if all_ok:
    print("ALL OK")
else:
    print("ERRORS FOUND")
