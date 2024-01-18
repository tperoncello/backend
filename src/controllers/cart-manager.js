const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart(nuevoCarrito) {
        try {
            const carritos = await this.leerArchivo();
            const id = this.generarIdUnico();
            const nuevoCarritoConId = { id, ...nuevoCarrito, products: [] };
            carritos.push(nuevoCarritoConId);
            await this.guardarArchivo(carritos);
        } catch (error) {
            console.error("Error al crear carrito", error);
            throw error;
        }
    }

    async getCartById(idCarrito) {
        try {
            const carritos = await this.leerArchivo();
            const carrito = carritos.find((c) => c.id === idCarrito);
            if (!carrito) {
                console.log("Carrito no encontrado");
                return null;
            }
            return carrito;
        } catch (error) {
            console.error("Error al obtener carrito por ID", error);
            throw error;
        }
    }

    async addProductToCart(idCarrito, idProducto, cantidad) {
        try {
            const carritos = await this.leerArchivo();
            const carritoIndex = carritos.findIndex((c) => c.id === idCarrito);

            if (carritoIndex !== -1) {
                // Encontramos el carrito
                const productoEnCarritoIndex = carritos[carritoIndex].products.findIndex(
                    (p) => p.id === idProducto
                );

                if (productoEnCarritoIndex !== -1) {
                    // El producto ya existe en el carrito, incrementamos la cantidad
                    carritos[carritoIndex].products[productoEnCarritoIndex].quantity += cantidad;
                } else {
                    // El producto no existe en el carrito, lo agregamos
                    carritos[carritoIndex].products.push({ id: idProducto, quantity: cantidad });
                }

                await this.guardarArchivo(carritos);
            } else {
                console.log("Carrito no encontrado");
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
            throw error;
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const carritos = JSON.parse(respuesta);
            return carritos;
        } catch (error) {
            console.error("Error al leer archivo de carritos", error);
            throw error;
        }
    }

    async guardarArchivo(carritos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(carritos, null, 2));
        } catch (error) {
            console.error("Error al guardar archivo de carritos", error);
            throw error;
        }
    }

    generarIdUnico() {
        // Método para generar un ID único (puedes implementar tu propia lógica)
        return Date.now().toString();
    }
}

module.exports = CartManager;
