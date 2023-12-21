// Obtén la lista de productos y muestra las imágenes con título y descripción
fetch('/products')
  .then(response => response.json())
  .then(products => {
    const imageContainer = document.getElementById('imageContainer');

    products.forEach(product => {
      // Contenedor para cada producto
      const productContainer = document.createElement('div');

      // Imagen
      const imageElement = document.createElement('img');
      imageElement.src = product.thumbnail;
      imageElement.alt = product.title;
      imageElement.classList.add('product-image'); // Agrega la clase 'product-image'

      // Título
      const titleElement = document.createElement('h2');
      titleElement.textContent = product.title;

      // Descripción
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = product.description;

      // Agregar elementos al contenedor del producto
      productContainer.appendChild(imageElement);
      productContainer.appendChild(titleElement);
      productContainer.appendChild(descriptionElement);

      // Agregar el contenedor del producto al contenedor de imágenes
      imageContainer.appendChild(productContainer);
    });
  })
  .catch(error => console.error('Error al obtener productos:', error));
