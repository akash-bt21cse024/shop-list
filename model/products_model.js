const moongoose = require("mongoose");

const { Schema } = moongoose;

const productSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  price: Number,
  description: String,
  rating: Number,
  thumbnail: String,
  category: String,
  brand: String,
  discountPercentage: Number,
  stock: Number,
  images: Array,
});

const Product = moongoose.model("Product", productSchema);

module.exports = Product;
