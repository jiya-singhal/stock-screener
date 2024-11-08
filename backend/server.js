const express = require('express');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});