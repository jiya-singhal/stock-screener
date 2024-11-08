const { parseCSV } = require('./csvParser'); 

const filePath = 'data.csv';

parseCSV(filePath)
  .then((data) => {
    console.log('Parsed Data:', data); 
  })
  .catch((error) => {
    console.error('Error parsing CSV:', error); 
  });
