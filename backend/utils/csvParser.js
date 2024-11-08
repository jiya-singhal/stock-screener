const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const fullFilePath = path.join(__dirname, filePath);

    fs.createReadStream(fullFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = { parseCSV };
