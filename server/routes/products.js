var express = require("express");
var router = express.Router();
const productSchema = require("../models/products.model.js");
const {
  authToken,
  checkIsActive,
} = require("../middleware/auth.middleware.js");

router.get("/", [authToken, checkIsActive], async function (req, res, next) {
  try {
    // const { search } = req.querys;
    let products = await productSchema.find({});
    res.send({
      status: "success",
      masasge: "success",
      data: products,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
router.get("/:id", [authToken, checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;
    let products = await productSchema.findById(id);

    console.log(products);

    res.send({
      status: "success",
      masasge: "success",
      data: products,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post("/", [authToken, checkIsActive], async function (req, res, next) {
  try {

  
    const { name, price, quantity } = req.body;

    await new productSchema({
      name,
      price,
      quantity,
    }).save();

    res.send("create product success.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.put("/:id", [authToken, checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;

    const { name, price, quantity } = req.body;

    await productSchema.findByIdAndUpdate(id, {
      name,
      price,
      quantity,
    });

    res.send("updated product success.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.delete("/:id", [authToken, checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;


    await productSchema.findByIdAndDelete(id)


    res.send("Deleted product success.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
