// const express = require("express");
// const router = express.Router();

// const CartManager = require("../controllers/cart-manager.js");
// const cartManager = new CartManager("./src/models/carrito.json");

// // Rutas:

// router.post("/carts", async (req, res) => {
//     try {
//         const nuevoCarrito = req.body;
//         await cartManager.createCart(nuevoCarrito);
//         res.json({ mensaje: "Carrito creado correctamente" });
//     } catch (error) {
//         console.error("Error al crear carrito", error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });

// router.get("/carts/:cid", async (req, res) => {
//     try {
//         const idCarrito = req.params.cid;
//         const carrito = await cartManager.getCartById(idCarrito);
//         res.json(carrito);
//     } catch (error) {
//         console.error("Error al obtener carrito", error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });

// router.post("/carts/:cid/product/:pid", async (req, res) => {
//     try {
//         const idCarrito = req.params.cid;
//         const idProducto = req.params.pid;
//         const cantidad = req.body.quantity;
//         await cartManager.addProductToCart(idCarrito, idProducto, cantidad);
//         res.json({ mensaje: "Producto agregado al carrito correctamente" });
//     } catch (error) {
//         console.error("Error al agregar producto al carrito", error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });

// // ... (otras rutas existentes)

// module.exports = router;


const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/carrito.json");

router.get("/carts", async (req, res) => {
    try {
        const carts = await productManager.getProducts();
        res.json(carts);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.json({ error: "Error del servidor" });
    }
});

module.exports = router;
