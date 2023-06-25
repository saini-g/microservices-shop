const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use((req, res, next) => {
  res.on('finish', function() {
    console.log(`${req.method} ${req.url} - ${res.statusCode} ${res.statusMessage}`);
  });
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST');
      return res.sendStatus(200);
  }
  next();
});

app.get('/', (req, res, next) => {
  const { ids } = req.query;
  let resultProducts = products;

  if (ids) {
    const productIds = ids.split(',');
    resultProducts = products.filter((p) => productIds.includes(p.id));
  }
  res.status(200).json(resultProducts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const products = [
  {
    id: '1',
    name: 'Sneakers',
    price: 20,
    keywords: ['shoes', 'footwear']
  },
  {
    id: '2',
    name: 'Half Sleeve Shirt',
    price: 15,
    keywords: ['shirt', 'topwear']
  },
  {
    id: '3',
    name: 'Shorts',
    price: 8,
    keywords: ['shorts', 'bottomwear']
  },
  {
    id: '4',
    name: 'Full Sleeve Shirt',
    price: 18,
    keywords: ['shirt', 'topwear']
  },
  {
    id: '5',
    name: 'Sunglasses',
    price: 25,
    keywords: ['accessories', 'sunglasses']
  }
];
