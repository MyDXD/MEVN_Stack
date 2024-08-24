var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = "mysecret";


// Route สำหรับการเข้าสู่ระบบ

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age,} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
      age,
    });
    await user.save();
    res.status(201).json({ status : "201" ,message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status : 404 ,message: "User not found" });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status : 401 ,message: "Invalid password" });
    }

    // สร้าง JWT token
    const token = jwt.sign(
      {  id: user._id, role: user.role, name : user.name },
      secret,
      {
        expiresIn: "1d",
      }
    );

    res.json({ id : user._id , email : user.email, userName : user.name, token ,   isActive : user.isActive });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

module.exports = router;
