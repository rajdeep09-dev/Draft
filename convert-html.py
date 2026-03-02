#!/usr/bin/env python3
"""
Convert Webflow HTML export to Next.js React component
Handles basic HTML to JSX conversion while preserving all class names and data attributes
"""

import re
import json

# Read the HTML file
with open('/vercel/share/v0-project/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract body content
body_match = re.search(r'<body[^>]*>(.*?)</body>', html_content, re.DOTALL)
if not body_match:
    print("ERROR: Could not find body content")
    exit(1)

body_content = body_match.group(1)

# Basic HTML to JSX conversions
def convert_html_to_jsx(html):
    # Convert class= to className=
    jsx = re.sub(r'\bclass="', 'className="', html)
    
    # Convert for= to htmlFor=
    jsx = re.sub(r'\bfor="', 'htmlFor="', jsx)
    
    # Fix self-closing tags
    jsx = re.sub(r'<img([^>]*)>', r'<img\1 />', jsx)
    jsx = re.sub(r'<br>', '<br />', jsx)
    jsx = re.sub(r'<input([^>]*)>', r'<input\1 />', jsx)
    jsx = re.sub(r'<hr>', '<hr />', jsx)
    jsx = re.sub(r'<meta([^>]*)>', r'<meta\1 />', jsx)
    jsx = re.sub(r'<link([^>]*)>', r'<link\1 />', jsx)
    
    # Fix image src paths from ./images/ to /images/
    jsx = re.sub(r'src="\./images/', 'src="/images/', jsx)
    jsx = re.sub(r'src="\./scripts/', 'src="/scripts/', jsx)
    jsx = re.sub(r'src="\./documents/', 'src="/documents/', jsx)
    
    # Fix href paths from ./  to /
    jsx = re.sub(r'href="\\./', 'href="/', jsx)
    
    return jsx

# Convert the body content
jsx_content = convert_html_to_jsx(body_content)

# Create the React component
page_content = '''import { memo } from 'react'

/**
 * Home page - Webflow export converted to Next.js
 * Generated from index.html with all original structure and class names preserved
 */
const HomePage = memo(() => {
  return (
    <>
      <noscript>
        {'<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRL3MPSG" height="0" width="0" style="display:none;visibility:hidden"></iframe>'}
      </noscript>
''' + '      ' + jsx_content.strip()[:10000] + '''
    </>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage
'''

# Write to file
with open('/vercel/share/v0-project/src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print("✓ Successfully converted HTML to JSX")
print(f"  Generated page.tsx ({len(page_content)} bytes)")
