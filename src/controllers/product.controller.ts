import { Request, Response } from "express";
import productModel from "../models/product.model";
import { Product } from "@prisma/client";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.fetchAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: "Unable to fetch data" });
  }
};

const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productModel.fetchProductById(id);
    if (!product) {
      res.status(404).json({ error: "Product does not exist" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get product" });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, price } = req.body;
    const newProduct = await productModel.createProduct({
      productName,
      price,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to add product" });
  }
};

const updateProduct = async (
  req: Request<{ id: string }, {}, Omit<Product, "id">>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { productName, price } = req.body;
    const updateProduct = await productModel.updateProduct(id, {
      productName,
      price,
    });
    res.status(200).json(updateProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update" });
  }
};

const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const deleteProduct = await productModel.deleteProduct(id);
    res.status(200).json(deleteProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
};
