import { Router } from "express";
// import { ProductFS } from "../src/dao/managers/mongo/productsMongo.js";
import { uploader } from "../src/utils.js";
import Product from '../src/dao/managers/models/products.model.js';


// const ProductFS = new ProductFS();
const products = [];
const router_fs = Router();

router_fs.post("/", uploader.single("fileImage"), (req, res) => {
  console.log("files", req.file);
  const newProduct = req.body;
  products.push(newProduct);
  console.log('products', products);
  res.json({ status: "success", "message": "producto creado" });

  const product = new Product({
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,  // Agregar la descripción al objeto del producto
  });

  product.save()
      .then(() => {
          console.log('Producto guardado en la base de datos');
      })
      .catch(error => {
          console.error('Error al guardar el producto en la base de datos:', error);
      });
});

// ...

const showDetails = async (productId) => {
  try {
      // Realiza una solicitud al servidor para obtener los detalles del producto.
      const response = await fetch(`/products/${productId}`);
      if (response.ok) {
          const productDetails = await response.json();

          // Muestra los detalles del producto en el modal.
          const productDetailsModal = document.getElementById('productDetailsModal');
          const productDetailsElement = document.getElementById('productDetails');
          productDetailsElement.innerHTML = `
              <p>Nombre: ${productDetails.name}</p>
              <p>Precio: ${productDetails.price}</p>
              <p>Descripción: ${productDetails.description}</p>
          `;
          productDetailsModal.style.display = 'block';
      } else {
          console.error('Error al obtener detalles del producto');
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

const closeProductDetails = () => {
  // Cierra el modal al hacer clic en la "X" o fuera del modal.
  const productDetailsModal = document.getElementById('productDetailsModal');
  productDetailsModal.style.display = 'none';
};

// ...


export { router_fs as routerFS }