import { cartsModel } from '../models/carts.model.js';

export class CartsManagerMongo {
  constructor(model) {
    this.model = model || cartsModel;
  }

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId) {
    try {
      let cart = await this.model.findById(cartId);

      if (!cart) {
        // Si el carrito no existe, créalo.
        cart = await this.model.create({});
        cartId = cart._id; // Obten el nuevo ID del carrito
      }

      // Agregar el ID del producto al arreglo de productos del carrito
      cart.products.push(productId);

      // Guardar los cambios en el carrito
      await cart.save();

      console.log('ID del producto agregado al carrito:', productId);
      console.log('Carrito actualizado:', cart);

      return cart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.model
        .findById(cartId)
        .populate('products', 'name price description', ); // campos a obtener de los productos
      return cart;
    } catch (error) {
      console.error('Error al obtener carrito por ID:', error);
      throw error;
    }
  }

  // Obtener todos los carritos
  async getAll() {
    try {
      const carts = await this.model.find();
      return carts;
    } catch (error) {
      console.error('Error al obtener todos los carritos:', error);
      throw error;
    }
  }
}

export default CartsManagerMongo;
