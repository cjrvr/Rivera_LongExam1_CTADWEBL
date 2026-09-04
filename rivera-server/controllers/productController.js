require("../models/categoryModel");

const Product = require("../models/productModel");
const { HttpStatus } = require("../config/constants");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stockQuantity,
      category,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      stockQuantity === undefined ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, price, stock quantity, and category are required",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stockQuantity,
      category,
      seller: req.user._id,
    });

    const savedProduct = await newProduct.save();

    const populatedProduct = await Product.findById(
      savedProduct._id
    )
      .populate("category")
      .populate("seller", "-password");

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const queryObj = {};

    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    if (req.query.search) {
      queryObj.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    let sortQuery = "name";

    if (req.query.sort) {
      sortQuery = req.query.sort
        .split(",")
        .join(" ");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(queryObj)
      .populate("category")
      .populate("seller", "-password")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const totalProducts =
      await Product.countDocuments(queryObj);

    res.status(HttpStatus.OK).json({
      success: true,
      count: products.length,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      itemsPerPage: limit,
      data: products,
    });
  } catch (error) {
    res.status(
      HttpStatus.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    )
      .populate("category")
      .populate("seller", "-password");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    delete req.body.seller;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category")
      .populate("seller", "-password");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};