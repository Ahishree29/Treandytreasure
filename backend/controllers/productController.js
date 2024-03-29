const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Comment = require("../models/commentModel");
const getProducts = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const { productType, category, section } = req.body;
    const key = req.params.query
      ? {
          $or: [
            { season: { $regex: req.params.query, $options: "i" } },
            { occasion: { $regex: req.params.query, $options: "i" } },
            { item_category: { $regex: req.params.query, $options: "i" } },
            { item_type: { $regex: req.params.query, $options: "i" } },
          ],
        }
      : {};

    const query = {
      product_type: productType,
      category: category,
      ...key,
    };

    if (section) {
      query.section = section;
    }
    const totalProductsCount = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

  
    const populatedProducts = await Product.populate(products, {
      path: "comment",
    });

    res.json({ data: populatedProducts, nbHits: totalProductsCount });
  } catch (error) {
    res.status(401);
    throw new Error("Something went wrong");
  }
});
const getProductsbycategory = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const { productType, category, section } = req.body;
    const query = {
      product_type: productType,
    };
    if (category) {
      query.category = category;
    }

    if (section) {
      query.section = section;
    }
    const totalProductsCount = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

   
    const populatedProducts = await Product.populate(products, {
      path: "comment",
    });

    res.json({ data: populatedProducts, nbHits: totalProductsCount });
  } catch (error) {
    res.status(401);
    throw new Error("Something went wrong");
  }
});
const getProductsOffer = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const { productType, category } = req.body;
    const off = req.params.offer;
    let query = {
      product_type: productType,
    };
    if (off) {
      query.offer = off;
    }
    if (category) {
      query.category = category;
    }
    const totalProductsCount = await Product.countDocuments(query);
    const products = await Product.find(query).limit(limit).skip(skip);

  
    const populatePromises = [];


    for (const product of products) {
     
      const comments = await Comment.find({ productId: product._id });

  
      product.comment = comments;


      populatePromises.push(
        Product.findByIdAndUpdate(
          product._id,
          { $set: { comment: comments } },
          { new: true }
        )
      );
    }

   
    await Promise.all(populatePromises);

    res.json({
      data: products,
      nbHits: totalProductsCount,
    });
  } catch (error) {
    res.status(401);
    throw new Error("something went wrong");
  }
});
const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(400).json({ error: "product not found" });
    }

    const populatePromises = [];

   
    const comments = await Comment.find({ productId: product._id });

 
    product.comment = comments;

  
    populatePromises.push(
      Product.findByIdAndUpdate(
        product._id,
        { $set: { comment: comments } },
        { new: true }
      )
    );

  
    await Promise.all(populatePromises);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getProducts,
  getProductsOffer,
  getProductById,
  getProductsbycategory,
};
