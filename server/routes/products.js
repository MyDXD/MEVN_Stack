var express = require("express");
var router = express.Router();
const productSchema = require("../models/products.model.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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
      status: 200,
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
    const image = req.file ? req.file.filename : null;


    const productData = req.body
    await new productSchema({
      name,
      price,
      quantity,
      image
    }).save();

    res.status(201).send({status : 201 ,message : "create product success.",  data :  productData });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.put("/:id", [authToken, checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;

    const { name, price, quantity } = req.body;
    const productData = req.body
    await productSchema.findByIdAndUpdate(id, {
      name,
      price,
      quantity,
    });

    res.status(201).send({status : 201 , massage : "updated product success." ,data : productData});
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.delete("/:id", [authToken, checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;


    await productSchema.findByIdAndDelete(id)


    res.status(200).send({status : 200 ,  massage : "Deleted product success."});
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
