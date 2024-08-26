const express = require("express");
const router = express.Router();
const productSchema = require("../models/products.model.js");
const orderSchema = require("../models/order.model.js");
const {
  authToken,
  checkIsActive,
} = require("../middleware/auth.middleware.js");

router.get("/orders",
  [authToken, checkIsActive],
  async function (req, res, next) {
    try {
      
      const orders = await orderSchema.find();

      res.json({
        orders: orders,
      });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
);

router.get(
  "/products/:id/orders",
  [authToken, checkIsActive],
  async function (req, res, next) {
    try {
      const { id } = req.params;

      const product = await productSchema.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }


      const orders = await orderSchema.find({ product: id,});
      
      const total = product.price * product.quantity

      res.json({
        product_id: product.id,
        product_name: product.name,
        quantity: product.quantity,
        price: total,
        orders: {orders},
      });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
);

router.post(
  "/products/:id/orders",
  [authToken, checkIsActive],
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const product = await productSchema.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      // ตรวจสอบว่ามีการส่งจำนวน (quantity) มาและจำนวนต้องมากกว่า 0
      if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity." });
      }

      // ตรวจสอบว่าสินค้ามีจำนวน (quantity) เพียงพอหรือไม่
      if (product.quantity < quantity) {
        return res
          .status(400)
          .json({ message: "Not enough product quantity available." });
      }

      
      // สร้างคำสั่งซื้อใหม่
      const order = new orderSchema({
        product: id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
      });

      // บันทึกคำสั่งซื้อ
      await order.save();

      product.quantity -= quantity;
      await product.save();

      res.status(201).json({
        message: "Order created successfully.",
        order: order,
      });

    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
);

router.put("/:id", [authToken, checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;

    const { name, price, quantity } = req.body;

    await orderSchema.findByIdAndUpdate(id, {
      name,
      price,
      quantity,
    });

    res.send("updated product success.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.delete(
  "/:id",
  [authToken, checkIsActive],
  async function (req, res, next) {
    try {
      const { id } = req.params;

      await orderSchema.findByIdAndDelete(id);

      res.send("Deleted product success.");
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
);

module.exports = router;
