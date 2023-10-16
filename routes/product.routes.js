import { Router } from "express";
import { productService } from "../src/dao/index.js";

const router = Router();

// Middleware para validar campos obligatorios
const validateFields = (req, res, next) => {
  const productInfo = req.body;
  if (!productInfo.name || !productInfo.p_desc || !productInfo.price) {
    return res.json({ status: "error", message: "Campos incompletos" });
  } else {
    next();
  }
};

// Ruta raíz GET /api/products/
// Lista todos los productos de la base
router.get("/", async (req, res) => {
  try {
    const products = await productService.get();
    res.json({ status: "success", data: products });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Ruta GET /api/products/:pid
// Obtiene un producto por su ID
router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getById(productId);

    if (product) {
      res.json({ status: "success", data: product });
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Ruta POST /api/products/
// Crea un nuevo producto
router.post("/", validateFields, async (req, res) => {
  try {
    const productInfo = req.body;
    const productCreated = await productService.save(productInfo);
    res.json({ status: "success", data: productCreated, message: "Producto creado" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Ruta PUT /api/products/:pid
// Actualiza un producto por su ID
router.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const productInfo = req.body;
    const updatedProduct = await productService.updateProduct(productId, productInfo);

    if (updatedProduct) {
      res.json({ status: "success", data: updatedProduct, message: "Producto actualizado" });
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Ruta DELETE /api/products/:pid
// Elimina un producto por su ID
router.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await productService.delete(productId);

    if (deletedProduct) {
      res.json({ status: "success", data: deletedProduct, message: "Producto eliminado" });
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export { router as productsRouters };
