import fs from 'fs';
import path from 'path';

// Try multiple possible paths for the HTML file
const possiblePaths = [
  '/vercel/share/v0-project/index.html',
  './index.html',
  '../index.html',
  '../../index.html'
];

let htmlFile = null;
let htmlContent = '';

for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p)) {
      htmlContent = fs.readFileSync(p, 'utf-8');
      htmlFile = p;
      console.log(`[v0] Found HTML at: ${p}`);
      break;
    }
  } catch (e) {
    // Continue
  }
}

if (!htmlFile) {
  console.log('[v0] Checking current directory...');
  try {
    const cwd = process.cwd();
    console.log(`[v0] Current working directory: ${cwd}`);
    const files = fs.readdirSync(cwd);
    console.log(`[v0] Files in current directory: ${files.slice(0, 20).join(', ')}`);
    
    // Try to find index.html in any subdirectory
    function findFile(dir, name) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (file === name) return fullPath;
        if (fs.statSync(fullPath).isDirectory() && !file.startsWith('.')) {
          const result = findFile(fullPath, name);
          if (result) return result;
        }
      }
      return null;
    }
    
    const found = findFile(cwd, 'index.html');
    if (found) {
      console.log(`[v0] Found index.html at: ${found}`);
      htmlContent = fs.readFileSync(found, 'utf-8');
      htmlFile = found;
    }
  } catch (e) {
    console.error(`[v0] Error searching for file: ${e.message}`);
  }
}

if (!htmlFile) {
  console.error('[v0] Could not find index.html in any expected location');
  process.exit(1);
}

console.log('[v0] Converting HTML to JSX...');

// Extract body content
const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.error('[v0] Could not find body content in HTML');
  process.exit(1);
}

let bodyContent = bodyMatch[1];

// Convert HTML to JSX
bodyContent = bodyContent
  // Convert class= to className=
  .replace(/\bclass="/g, 'className="')
  // Convert for= to htmlFor=
  .replace(/\bfor="/g, 'htmlFor="')
  // Fix self-closing tags
  .replace(/<img([^>]*)>/g, '<img$1 />')
  .replace(/<br>/g, '<br />')
  .replace(/<input([^>]*)>/g, '<input$1 />')
  // Fix image paths
  .replace(/src="\.\//g, 'src="/')
  .replace(/href="\.\//g, 'href="/')
  .replace(/src="\/\./g, 'src="/');

// Escape JSX special characters properly
bodyContent = bodyContent
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const pageContent = `'use client'

import { memo } from 'react'

/**
 * Home page - Webflow export converted to Next.js
 * Generated from index.html with all original structure preserved
 */
const HomePage = memo(() => {
  return (
    <>
      <noscript>
        {'<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRL3MPSG" height="0" width="0" style="display:none;visibility:hidden"></iframe>'}
      </noscript>
      <div dangerouslySetInnerHTML={{__html: \`${bodyContent}\`}} />
    </>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage
`;

try {
  fs.writeFileSync('/vercel/share/v0-project/src/app/page.tsx', pageContent, 'utf-8');
  console.log('[v0] ✓ Successfully created page.tsx');
  console.log(`[v0] File size: ${pageContent.length} bytes`);
} catch (e) {
  console.error(`[v0] Error writing page.tsx: ${e.message}`);
  process.exit(1);
}
