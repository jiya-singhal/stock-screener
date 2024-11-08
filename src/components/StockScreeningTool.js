import React, { useState } from 'react';
import './StockScreeningTool.css';

const StockScreeningTool = ({ stockData }) => {
  const [filters, setFilters] = useState([
    { field: 'marketCap', operator: '>', value: 10000 },
    { field: 'roe', operator: '>', value: 15 },
    { field: 'peRatio', operator: '<', value: 20 },
  ]);
  const [sortField, setSortField] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleAddFilter = () => {
    setFilters([...filters, { field: 'marketCap', operator: '>', value: 0 }]);
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleFilterChange = (index, field, operator, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { field, operator, value };
    setFilters(updatedFilters);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredStocks = stockData.filter((stock) =>
    filters.every(
      (filter) =>
        stock[filter.field] !== undefined &&
        (filter.operator === '>' ? stock[filter.field] > filter.value : null) &&
        (filter.operator === '<' ? stock[filter.field] < filter.value : null) &&
        (filter.operator === '=' ? stock[filter.field] === filter.value : null)
    )
  );

  const sortedStocks = filteredStocks.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Screening Tool</h2>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Filter Criteria</h3>
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center mb-2">
            <select
              value={filter.field}
              onChange={(e) =>
                handleFilterChange(index, e.target.value, filter.operator, filter.value)
              }
              className="mr-2 px-2 py-1 border rounded"
            >
              <option value="marketCap">Market Cap</option>
              <option value="peRatio">P/E Ratio</option>
              <option value="roe">ROE</option>
              <option value="debtToEquity">Debt-to-Equity</option>
              <option value="dividendYield">Dividend Yield</option>
              <option value="revenueGrowth">Revenue Growth</option>
              <option value="epsGrowth">EPS Growth</option>
              <option value="currentRatio">Current Ratio</option>
              <option value="grossMargin">Gross Margin</option>
            </select>
            <select
              value={filter.operator}
              onChange={(e) =>
                handleFilterChange(index, filter.field, e.target.value, filter.value)
              }
              className="mr-2 px-2 py-1 border rounded"
            >
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="=">=</option>
            </select>
            <input
              type="number"
              value={filter.value}
              onChange={(e) =>
                handleFilterChange(index, filter.field, filter.operator, Number(e.target.value))
              }
              className="mr-2 px-2 py-1 border rounded"
            />
            <button
              onClick={() => handleRemoveFilter(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        >
          Add Filter
        </button>
      </div>

      <h3 className="text-lg font-medium mb-2">Screened Stocks</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('marketCap')}
            >
              Market Cap {sortField === 'marketCap' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('peRatio')}
            >
              P/E Ratio {sortField === 'peRatio' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('roe')}
            >
              ROE {sortField === 'roe' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('debtToEquity')}
            >
              Debt-to-Equity {sortField === 'debtToEquity' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('dividendYield')}
            >
              Dividend Yield {sortField === 'dividendYield' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('revenueGrowth')}
            >
              Revenue Growth {sortField === 'revenueGrowth' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('epsGrowth')}
            >
              EPS Growth {sortField === 'epsGrowth' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('currentRatio')}
            >
              Current Ratio {sortField === 'currentRatio' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
            <th
              className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('grossMargin')}
            >
              Gross Margin {sortField === 'grossMargin' && (
                sortDirection === 'asc' ? '▲' : '▼'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2">{stock.marketCap.toFixed(2)}</td>
              <td className="px-4 py-2">{stock.peRatio.toFixed(2)}</td>
              <td className="px-4 py-2">{stock.roe.toFixed(2)}%</td>
              <td className="px-4 py-2">{stock.debtToEquity.toFixed(2)}</td>
              <td className="px-4 py-2">{stock.dividendYield.toFixed(2)}%</td>
              <td className="px-4 py-2">{stock.revenueGrowth.toFixed(2)}%</td>
              <td className="px-4 py-2">{stock.epsGrowth.toFixed(2)}%</td>
              <td className="px-4 py-2">{stock.currentRatio.toFixed(2)}</td>
              <td className="px-4 py-2">{stock.grossMargin.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockScreeningTool;