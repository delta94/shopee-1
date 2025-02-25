import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @description Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @description Fetch a product
 * @route       GET /api/product/:id
 * @access      Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @description Delete a product
 * @route       DELETE /api/product/:id
 * @access      Private / Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @description Create a product
 * @route       POST /api/product
 * @access      Private / Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  } = req.body;

  const product = await Product.create({
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    user: req.user.id,
  });

  if (product) {
    res.status(201);
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Fail to create new product');
  }
});

/**
 * @description Update a product
 * @route       PUT /api/product/:id
 * @access      Private / Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  } = req.body;

  const productToUpdate = await Product.findById(id);

  productToUpdate.name = name;
  productToUpdate.image = image;
  productToUpdate.description = description;
  productToUpdate.brand = brand;
  productToUpdate.category = category;
  productToUpdate.price = price;
  productToUpdate.countInStock = countInStock;

  const product = await productToUpdate.save();

  if (product) {
    res.status(201);
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Fail to update product');
  }
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
