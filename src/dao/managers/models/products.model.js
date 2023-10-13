import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { productsCollection } from "../../../constants/index.js";

const productsSchema = new mongoose.Schema({
  name: {
    type:String, 
    required:true
  }, 
  price: {
      type: String,
    required:true,
  },
});

//aplicacion de paginate al schema
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;