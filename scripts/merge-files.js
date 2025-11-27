import fs from 'fs';
import path from 'path';

/**
 * Recursively gets all .ts, .tsx, and .scss files from specified directories.
 * @param {string} dirPath - The directory path to search.
 * @param {string[]} arrayOfFiles - Accumulator for file paths.
 * @param {string[]} extensions - File extensions to include.
 * @returns {string[]} Array of file paths.
 */
function getAllFiles(dirPath, arrayOfFiles = [], extensions = ['.ts', '.tsx', '.scss']) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles, extensions);
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Get all .ts and .tsx files from src directory (excluding styles)
const tsFiles = getAllFiles('./src', [], ['.ts', '.tsx']).filter(
  (file) => !file.startsWith(path.join('./src', 'styles'))
);

// Get all .scss files from src/styles directory
const scssFiles = getAllFiles('./src/styles', [], ['.scss']);

// Combine all files
const allFiles = [...tsFiles, ...scssFiles];

// Initialize merged content
let mergedContent = '';

// Concatenate files with path comments
allFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const commentPrefix = file.endsWith('.scss') ? '//' : '//';
  mergedContent += `${commentPrefix} ===== ${file} =====\n${content}\n\n`;
});

// Write to output file
fs.writeFileSync('merged-files.txt', mergedContent);

console.log('Merged file created: merged-files.txt');
