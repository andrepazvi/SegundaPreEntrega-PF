import { Router } from "express";
// import { ProductFS } from "../src/dao/managers/mongo/productsMongo.js";
import { uploader } from "../src/utils.js";
import Product from '../src/dao/managers/models/products.model.js';


// const ProductFS = new ProductFS();
const products = [];
const router_fs = Router();

router_fs.get("/",(req,res)=>{
    res.render("fileSystem");
});


//post de fileSystem
router_fs.post("/",uploader.single("fileImage"), (req,res)=>{
    console.log("files", req.file);
    const newProduct = req.body;
    products.push(newProduct);
    console.log('products', products);
    res.json({status:"success","message":"producto creado"});

    const product = new Product({
        name: newProduct.name, 
        price: newProduct.price,
      });

      product.save()
        .then(() => {
          console.log('Producto guardado en la base de datos');
        })
        .catch(error => {
          console.error('Error al guardar el producto en la base de datos:', error);
        });
}); 

export { router_fs as routerFS }