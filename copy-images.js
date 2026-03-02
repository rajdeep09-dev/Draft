import fs from 'fs';
import path from 'path';

const imageDir = '/vercel/share/v0-project/images';
const publicImagesDir = '/vercel/share/v0-project/public/images';

// Create public/images directory if it doesn't exist
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Get all files in images directory
const files = fs.readdirSync(imageDir);

let copied = 0;
let failed = 0;

files.forEach(file => {
  const sourcePath = path.join(imageDir, file);
  const destPath = path.join(publicImagesDir, file);
  
  try {
    // Check if it's a file (not a directory)
    const stat = fs.statSync(sourcePath);
    if (stat.isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      copied++;
      console.log(`✓ Copied: ${file}`);
    }
  } catch (error) {
    failed++;
    console.log(`✗ Failed: ${file} - ${error.message}`);
  }
});

console.log(`\nSummary: ${copied} files copied, ${failed} failed`);
