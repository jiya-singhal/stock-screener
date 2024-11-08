import axios from 'axios';

const API_URL = 'http://localhost:3001/api/stocks';

const getStocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching stock data');
  }
};

const stockService = {
  getStocks,
};

export default stockService;