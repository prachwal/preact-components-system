import fs from 'fs';
import path from 'path';

/**
 * Recursively gets all .ts and .tsx files from a directory.
 * @param {string} dirPath - The directory path to search.
 * @param {string[]} arrayOfFiles - Accumulator for file paths.
 * @returns {string[]} Array of file paths.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Get all .ts and .tsx files from src directory
const allFiles = getAllFiles('./src');

// Initialize merged content
let mergedContent = '';

// Concatenate files with path comments
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  mergedContent += `// ===== ${file} =====\n${content}\n\n`;
});

// Write to output file
fs.writeFileSync('merged-ts-files.txt', mergedContent);

console.log('Merged file created: merged-ts-files.txt');