class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    // Validar que no se repita el campo "code"
    if (this.products.some(product => product.code === code)) {
      console.error("El código del producto ya existe");
      return;
    }

    // Agregar producto con id autoincrementable
    const product = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail: `assets/${thumbnail}`, // Ajusta la ruta de la imagen
      code,
      stock
    };

    this.products.push(product);
    console.log(`Producto agregado: ${product.title}`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
      return null; // Retorna null en lugar de undefined para consistencia
    }
  }
}

// Ejemplo de uso con productos más realistas
const productManager = new ProductManager();

productManager.addProduct("Laptop", "Potente laptop para trabajo y juegos", 1200, "laptop.jpg", "LT001", 20);
productManager.addProduct("Smartphone", "Teléfono inteligente con última tecnología", 800, "smartphone.jpg", "SP002", 50);
productManager.addProduct("Cámara DSLR", "Cámara profesional para fotógrafos", 1500, "camera.jpg", "CA003", 10);
productManager.addProduct("Auriculares Inalámbricos", "Auriculares con cancelación de ruido", 200, "headphones.jpg", "AU004", 30);
productManager.addProduct("Smart TV", "Televisor con resolución 4K y tecnología Smart", 1000, "tv.jpg", "TV005", 15);

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(6)); // Debería mostrar "Producto no encontrado"
