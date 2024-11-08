const csvParser = require('../utils/csvParser');

const getStocks = async (req, res) => {
  try {
    const stockData = await csvParser.parseCSV('backend/data.csv');
    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data' });
  }
};

module.exports = { getStocks };