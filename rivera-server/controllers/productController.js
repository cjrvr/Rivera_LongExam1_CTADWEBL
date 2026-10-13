require("../models/categoryModel");

const Product = require("../models/productModel");
const { HttpStatus } = require("../config/constants");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "bulldogs-exchange/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

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

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stockQuantity,
      category,
      seller: req.user._id,
      imageUrl,
      imagePublicId,
    });

    const savedProduct = await newProduct.save();

    const populatedProduct = await Product.findById(savedProduct._id)
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
      sortQuery = req.query.sort.split(",").join(" ");
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

    const totalProducts = await Product.countDocuments(queryObj);

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
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
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
    delete req.body.imageUrl;
    delete req.body.imagePublicId;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (req.file) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer);

      req.body.imageUrl = uploadResult.secure_url;
      req.body.imagePublicId = uploadResult.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category")
      .populate("seller", "-password");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    product.imageUrl = uploadResult.secure_url;
    product.imagePublicId = uploadResult.public_id;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product image uploaded successfully",
      imageUrl: product.imageUrl,
      publicId: product.imagePublicId,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
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
  uploadProductImage,
};