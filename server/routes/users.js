var express = require("express");
var router = express.Router();
const userSchema = require("../models/user.model");
const { authToken, checkIsActive, checkAdmin } = require("../middleware/auth.middleware");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "mysecret";

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

/* GET users listing. */
router.get("/", [authToken, checkAdmin ,checkIsActive], async function (req, res, next) {
  try {
    // const { search } = req.querys;
    let users = await userSchema.find({});
    res.send({
      status: "success",
      masasge: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get("/:id", [authToken, checkAdmin ,checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;
    let users = await userSchema.findById(id);
    let token = await jwt.sign({ foo: "bar" }, secret);
    res.send({
      status: "success",
      message: "success",
      token,
      data: users,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post("/", [upload.single("profile")], async function (req, res, next) {
  try {
    const { name, age, email, password, role, isActive } = req.body;

    const userData = req.body

    await new userSchema({
      name,
      age,
      password: await bcrypt.hash(password, 10),
      role,
      email,
      isActive,
    }).save();

    res.status(201).json({
      status : 201,
      masasge: "success",
      data: userData,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.put("/:id",[authToken, checkAdmin ,checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name, age, email, password, role, isActive } = req.body;

    await userSchema.findByIdAndUpdate(id, {
      name,
      age,
      email,
      password,
      role,
      isActive,
    });

    res.status(201).send("update user success.", {
      masasge: "success",
      data: name,
      age,
      email,
      role,
      isActive,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.delete("/:id",[authToken, checkAdmin ,checkIsActive], async function (req, res, next) {
  try {
    const { id } = req.params;

    await userSchema.findByIdAndDelete(id);

    res.send("delete success.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
