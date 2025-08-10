const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("./ApiError");

const handleMongooseError = (error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    // Xử lý lỗi validation
    const errors = Object.values(error.errors).map((err) => {
      return {
        field: err.path,
        message: err.message,
      };
    });
    throw new ApiError(
      httpStatus.default.BAD_REQUEST,
      "Validation error",
      errors
    );
  } else if (error.code === 11000) {
    // Xử lý lỗi duplicate key
    const field = Object.keys(error.keyValue)[0];
    throw new ApiError(
      httpStatus.default.BAD_REQUEST,
      `${field} already exists`,
      [
        {
          field,
          message: `${field} already exists`,
        },
      ]
    );
  } else if (error instanceof mongoose.Error.CastError) {
    // Xử lý lỗi sai kiểu dữ liệu
    throw new ApiError(
      httpStatus.default.BAD_REQUEST,
      `Invalid ${error.path}`,
      [
        {
          field: error.path,
          message: `Invalid ${error.path} format`,
        },
      ]
    );
  }
  // Xử lý các lỗi khác
  throw new ApiError(
    httpStatus.default.INTERNAL_SERVER_ERROR,
    "An error occurred",
    error
  );
};

module.exports = handleMongooseError;
