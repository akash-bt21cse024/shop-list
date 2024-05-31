const mongoose = require("mongoose");
const { Schema } = mongoose;
const wishlistSchema = new Schema({
  id: { type: String, required: true, unique: true },
  wishlist: Array,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
