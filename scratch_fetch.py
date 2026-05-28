import urllib.request
import re

url = "https://sansebastianteitipac.gob.mx/articulo70.php"
try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req) as response:
        raw_bytes = response.read()
        try:
            html = raw_bytes.decode('utf-8')
        except:
            html = raw_bytes.decode('latin1')
    
    # Find all table rows
    tr_matches = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE)
    print("Found", len(tr_matches), "rows.")
    
    fractions = []
    for row in tr_matches[1:]: # Skip header
        tds = re.findall(r'<td[^>]*>(.*?)</td>', row, re.DOTALL | re.IGNORECASE)
        if len(tds) >= 2:
            # Re-read raw bytes or clean
            frac_raw = tds[0].encode('latin1', errors='ignore').decode('utf-8', errors='ignore') if hasattr(tds[0], 'encode') else tds[0]
            desc_raw = tds[1].encode('latin1', errors='ignore').decode('utf-8', errors='ignore') if hasattr(tds[1], 'encode') else tds[1]
            
            # Simple fallback: if there are too many 'ó' characters, clean them up or decode raw bytes properly
            # Let's decode directly from raw HTML
            frac = re.sub(r'<[^>]+>', '', tds[0]).strip()
            desc = re.sub(r'<[^>]+>', '', tds[1]).strip()
            
            # Clean up the interleaved 'o' or encoding artifact
            # If it's interleaved with 'ó', it means we did a wrong double decode somewhere. Let's fix this!
            # Let's write a python cleaner for the string:
            def clean_interleaved(s):
                # If the string contains 'ó' before every letter, it's a double encoding. Let's filter it out.
                if len(s) > 10 and s.count('ó') > len(s) // 3:
                    # Remove 'ó' that are interleaved
                    cleaned = []
                    skip = False
                    for char in s:
                        if char == 'ó':
                            continue
                        cleaned.append(char)
                    return "".join(cleaned)
                return s
            
            frac = clean_interleaved(frac)
            desc = clean_interleaved(desc)
            
            frac = frac.replace('&nbsp;', ' ').replace('Fraccin', 'Fracción')
            desc = desc.replace('&nbsp;', ' ').replace('  ', ' ')
            
            fractions.append((frac, desc))
            
    output_lines = []
    for i, (frac, desc) in enumerate(fractions):
        output_lines.append(f"FRACT_{i}: {frac} ||| {desc}")
        
    with open("scratch_fractions.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines))
    print("Wrote scratch_fractions.txt successfully with", len(fractions), "fractions!")
        
except Exception as e:
    print("Error:", e)
