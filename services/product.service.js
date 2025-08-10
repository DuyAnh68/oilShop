const httpStatus = require("http-status");
const { Product } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");
const handleMongooseError = require("../utils/handleMongooseError");

const createProduct = async (productBody) => {
  try {
    return await Product.create(productBody);
  } catch (error) {
    handleMongooseError(error);
  }
};

const getProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

const getProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Product not found");
  }

  const product = await Product.findById(id);
  return product;
};

const updateProductById = async (productId, updateBody) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Product not found");
  }
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.default.NOT_FOUND, "Product not found");
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.default.NOT_FOUND, "Product not found");
  }
  await product.deleteOne();
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
