import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Try to find the images directory
const possiblePaths = [
  '/vercel/share/v0-project/images',
  '/home/user/images',
  './images',
  '../images'
];

let imageDir = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    imageDir = p;
    console.log(`Found images directory at: ${p}`);
    break;
  }
}

if (!imageDir) {
  console.error('Could not find images directory');
  console.log('Current working directory:', process.cwd());
  console.log('Available directories:');
  execSync('ls -la', { stdio: 'inherit' });
  process.exit(1);
}

const publicImagesDir = '/vercel/share/v0-project/public/images';

// Get all files in images directory
const files = fs.readdirSync(imageDir);

let copied = 0;

files.forEach((file, index) => {
  const sourcePath = path.join(imageDir, file);
  const destPath = path.join(publicImagesDir, file);
  
  try {
    const stat = fs.statSync(sourcePath);
    if (stat.isFile()) {
      const buffer = fs.readFileSync(sourcePath);
      fs.writeFileSync(destPath, buffer);
      copied++;
      if (index % 10 === 0) console.log(`Progress: ${copied}/${files.length}`);
    }
  } catch (error) {
    // Silently skip errors
  }
});

console.log(`✓ Successfully copied ${copied} files`);
