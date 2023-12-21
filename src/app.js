const express = require('express');
const app = express();
const PORT = 3000;

// Importa la clase ProductManager
const { productManager } = require('./ProductManager');

// Define el middleware para servir archivos estáticos desde la carpeta src
app.use(express.static('src'));

// Ruta principal para enviar index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();
  const limitedProducts = limit ? products.slice(0, limit) : products;
  res.json(limitedProducts);
});

// Ruta para obtener el script del cliente
app.get('/client.js', (req, res) => {
  res.sendFile(__dirname + '/src/client.js');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto http://localhost:${PORT}`);
});
