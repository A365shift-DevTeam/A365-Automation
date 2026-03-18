const fs = require('fs');
const path = require('path');

function removeBold() {
  const srcDir = 'e:\\Arul\\PROJECTS\\A365Shift-Automation POC\\A365-Automation\\src';
  const excluded = ['Hero.tsx'];
  
  let count = 0;
  let fileCount = 0;

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (excluded.includes(file)) continue;
        
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('font-bold') || content.includes('font-black')) {
          const newContent = content
            .replace(/font-bold\s/g, '')
            .replace(/font-bold/g, '')
            .replace(/font-black\s/g, '')
            .replace(/font-black/g, '');
            
          fs.writeFileSync(fullPath, newContent, 'utf8');
          
          count += (content.match(/font-bold/g) || []).length;
          count += (content.match(/font-black/g) || []).length;
          fileCount++;
        }
      }
    }
  }

  walk(srcDir);
  console.log(`Replaced ${count} instances across ${fileCount} files.`);
}

removeBold();
