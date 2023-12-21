// app.js

const express = require('express');
const app = express();
const PORT = 3000;

const ProductManager = require('./ProductManager');
const productManager = new ProductManager('./products.json');

app.use(express.static('src'));

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();
  const limitedProducts = limit ? products.slice(0, limit) : products;
  res.json(limitedProducts);
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto http://localhost:${PORT}`);
});
