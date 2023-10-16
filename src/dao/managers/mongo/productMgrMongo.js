import { productsModel } from '../models/products.model.js';

export class ProductManagerMongo {
  constructor(model) {
    this.model = model || productsModel;
  }

  async get() {
    try {
      const products = await this.model.find().lean(); // lean convierte el BSON a JSON
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getWithPaginate(query, options) {
    try {
      const result = await this.model.paginate(query, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await this.model.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async save(product) {
    try {
      const productCreated = await this.model.create(product);
      return productCreated;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManagerMongo;
