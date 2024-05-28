const mongoose = require('mongoose');
const { Schema } = mongoose;
const wishlistSchema = new Schema({
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
    images: Array
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;