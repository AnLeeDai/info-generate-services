import * as fs from 'fs';

const dbPath = './data/database.sqlite';

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Database file deleted:', dbPath);
} else {
  console.log('Database file does not exist:', dbPath);
}

// Tạo lại file database rỗng
fs.closeSync(fs.openSync(dbPath, 'w'));
console.log('Database file created:', dbPath);
