const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

router.post("/products", async (req, res) => {
    try {
        const nuevoProducto = req.body;
        await productManager.addProduct(nuevoProducto);
        res.json({ mensaje: "Producto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/products/:pid", async (req, res) => {
    try {
        const idProducto = parseInt(req.params.pid);
        const productoActualizado = req.body;
        await productManager.updateProduct(idProducto, productoActualizado);
        res.json({ mensaje: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete("/products/:pid", async (req, res) => {
    try {
        const idProducto = parseInt(req.params.pid);
        await productManager.deleteProduct(idProducto);
        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

module.exports = router;
