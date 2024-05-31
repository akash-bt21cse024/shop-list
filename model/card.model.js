const moongoose = require("mongoose");

const { Schema } = moongoose;

const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  card: Array,
});

const Cards = moongoose.model("Cards", productSchema);

module.exports = Cards;
