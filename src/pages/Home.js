import React, { useState, useEffect } from 'react';
import StockScreeningTool from '../components/StockScreeningTool';
import stockService from '../services/stockService';
import './Home.css';
const Home = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const data = await stockService.getStocks();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <StockScreeningTool stockData={stockData} />
    </div>
  );
};

export default Home;