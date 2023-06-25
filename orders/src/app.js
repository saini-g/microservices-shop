const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const PRODUCTS_APP_HOST = process.env.PRODUCTS_APP_HOST;

app.use((req, res, next) => {
  res.on('finish', function() {
    console.log(`${req.method} ${req.path} - ${res.statusCode} ${res.statusMessage}`);
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

app.post('/', async (req, res, next) => {
  try {
    const { productIds, userId } = req.body;

    const { data: orderedProducts } = await axios.get(
      `${PRODUCTS_APP_HOST}/?ids=${productIds.join(',')}`
    );
    let totalAmount = 0;
    let orderedProductNames = '';

    for (const product of orderedProducts) {
      totalAmount += product.price;
      orderedProductNames += orderedProductNames === '' ? product.name : `, ${product.name}`
    }

    const newOrder = {
      productIds,
      totalAmount,
      userId,
      id: Math.floor(Math.random() * 9999)
    };
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error('Page not found!');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .json({
        status: error.status || 500,
        message: error.message
    });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
