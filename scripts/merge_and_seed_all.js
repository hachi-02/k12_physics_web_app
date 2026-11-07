// D:\k12_physics_web_app\scripts\merge_and_seed_all.js
const fs = require('fs');
const path = require('path');
const katex = require('katex');

console.log('Merging full curriculum dataset...');

// 1. Read existing curriculum data
const curDataFile = path.resolve(__dirname, '../lib/curriculum-data.ts');
let curContent = fs.readFileSync(curDataFile, 'utf-8');

// Read generated parts
const part1Raw = fs.readFileSync(path.resolve(__dirname, '../lib/expanded-curriculum-data.ts'), 'utf-8');
const arrayStartIndex = part1Raw.indexOf('= [');
const part1 = JSON.parse(part1Raw.slice(arrayStartIndex + 2).replace(/;[\s\n]*$/, ''));
const part2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'temp_grades_6_7.json'), 'utf-8'));
const part3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'temp_grades_8_9.json'), 'utf-8'));
const part4 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'temp_grades_10_12.json'), 'utf-8'));

// Fix any numeric_unit warnings or formatting in part 2
for (const t of part2) {
  for (const q of t.questions) {
    if (q.numeric_unit === 'độ') q.numeric_unit = 'deg';
  }
}
for (const t of part3) {
  for (const q of t.questions) {
    if (q.numeric_unit === 'độ') q.numeric_unit = 'deg';
  }
}

const allAdditional = [...part1, ...part2, ...part3, ...part4];
console.log(`Total additional topics to merge: ${allAdditional.length}`);

// Check unique slugs
const existingSlugs = new Set();
// Match existing slugs
const slugMatches = curContent.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
for (const sm of slugMatches) {
  const s = sm.replace(/slug:\s*['"]/, '').replace(/['"]/, '');
  existingSlugs.add(s);
}

for (const t of allAdditional) {
  if (existingSlugs.has(t.slug)) {
    console.error(`Duplicate slug detected: ${t.slug}`);
    process.exit(1);
  }
  existingSlugs.add(t.slug);
}
console.log('All slugs verified unique.');

// Write consolidated file lib/curriculum-data.ts
// We will append allAdditional to CURRICULUM_DATA array before the closing "];"
const closingIndex = curContent.lastIndexOf('];');
if (closingIndex === -1) {
  console.error('Could not find closing ]; in curriculum-data.ts');
  process.exit(1);
}

const formattedAdditional = allAdditional.map((t) => {
  return '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ');
}).join(',\n\n');

const newCurContent = curContent.slice(0, closingIndex) + ',\n\n  // ==========================================================================\n  // COMPREHENSIVE EXPANDED CURRICULUM FOR ALL 12 GRADES (GDPT 2018)\n  // ==========================================================================\n' + formattedAdditional + '\n];\n';

fs.writeFileSync(curDataFile, newCurContent, 'utf-8');
console.log('Successfully updated lib/curriculum-data.ts with full comprehensive curriculum!');

// Clean temp files
try {
  fs.unlinkSync(path.resolve(__dirname, 'temp_grades_6_7.json'));
  fs.unlinkSync(path.resolve(__dirname, 'temp_grades_8_9.json'));
  fs.unlinkSync(path.resolve(__dirname, 'temp_grades_10_12.json'));
} catch (e) {}

console.log('Done preparing curriculum files.');
