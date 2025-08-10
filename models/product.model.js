const mongoose = require("mongoose");
const validator = require("validator");
const paginate = require("./plugins/paginate.plugin");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String },
    specifications: { type: String },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    stock_quantity: {
      type: Number,
      default: 0,
      min: [0, "Stock quantity cannot be negative"],
    },
    image_url: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: "Invalid imageURL",
      },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Add plugin
productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
