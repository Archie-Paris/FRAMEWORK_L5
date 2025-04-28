const fs = require('fs');
const path = require('path');

function filePath(entity) {
  return path.join(__dirname, 'db', `${entity}.json`);
}

function readData(entity) {
  const data = fs.readFileSync(filePath(entity), 'utf-8');
  return JSON.parse(data);
}

function writeData(entity, data) {
  fs.writeFileSync(filePath(entity), JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readData, writeData };
