import productModel from '../models/productModel.js';
import validator from 'validator';
export const createProduct = async (req, res) => {
  const product = req.body;
  console.log(product);
  try {
    const product = req.body;
    const result = await productModel.createProduct(
      validator.escape(product.productName),
      validator.escape(product.category),
      validator.escape(product.productDescription),
      validator.escape(product.productImage),
      validator.escape(product.price),
      validator.escape(product.quantityInstock)
    )
    resultaffectedRows === 1 ? res.status(201).json("The product was created.") : res.status(400).json("The product cannot be created.")
  } catch (error) {
    console.log(error);
    res.status(500).json("Create product failed, query error.")
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const result = await productModel.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Cannot get all products, query error")
  }
}

export const getProductById = async (req, res) => {
  const id = req.params.id
  try {
    const result = await productModel.getProductById(id);
    result.affectedRows > 0 ?
      res.status(200).json(result) :
      res.status(404).json("Product not found")
  } catch (error) {
    console.log(error);
    res.status(500).json("Cannot get all products, query error")
  }
}
export const getProductBySearch = async (req, res) => {
  const { productname, category } = req.query
  console.log("get product by search");
  try {
    const result = await productModel.getProductBySearch(productname, category);
    result.affectedRows > 0 ?
      res.status(200).json(result) :
      res.status(404).json("Product not found")
  } catch (error) {
    console.log(error);
    res.status(500).json("Cannot get all products, query error")
  }
}

export const updateProduct = async (req, res) => {
  const newProduct = req.body;
  try {
    const result = await productModel.updateProduct(
      validator.escape(newProduct.productId),
      validator.escape(newProduct.productName),
      validator.escape(newProduct.productDescription),
      validator.escape(newProduct.productImage),
      validator.escape(newProduct.price),
      validator.escape(newProduct.quantityInstock)
    );
    result.affectedRows > 0 ?
      res.status(200).json(result) :
      res.status(404).json("User not found")
  } catch (error) {
    console.log(error);
    res.status(500).json("Update product failed, query error")
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const result = await productModel.deleteProduct(req.params.id);
    result.affectedRows > 0 ?
      res.status(200).json("Product has been deleted") :
      res.status(400).json("Product not found")
  } catch (error) {
    console.log(error);
    res.status(500).json("Can not delete product, query error.")
  }
}