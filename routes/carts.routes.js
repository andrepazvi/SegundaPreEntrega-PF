import { Router } from "express";
import { cartService, productService } from "../src/dao/index.js";
// import { cartService } from "../src/dao/index.js";

const router = Router();

// Ruta para obtener detalles de un producto por ID
router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    // Realiza la lógica para obtener los detalles del producto por su ID
    const product = await productService.getProductById(productId);

    if (product) {
      res.json({ status: "success", data: product });
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.json({ status: "error", message: "Error al obtener detalles del producto" });
  }
});

export { router as cartsRouters }