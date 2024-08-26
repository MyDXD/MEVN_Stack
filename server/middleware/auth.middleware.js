const jwt = require("jsonwebtoken");
const secret = "mysecret";
const userSchema = require("../models/user.model");

const middleware = {
  authToken: async (req, res, next) => {
    try {
      console.log("Checking token");

      // ตรวจสอบว่า token ถูกส่งมาหรือไม่
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).send("Unauthorized");

      // ตรวจสอบและถอดรหัส token
      const payload = await jwt.verify(token, secret);
      req.auth = payload;

      // ดำเนินการต่อไปยัง middleware หรือ route ถัดไป
      return next();
    } catch (error) {
      // ส่งข้อผิดพลาดกลับไปที่ client
      res.status(500).send(error.toString());
    }
  },

  checkIsActive: async (req, res, next) => {

    console.log("Checking IsActive");

    try {
      // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ id ที่อยู่ใน payload ของ token
   

      const user = await userSchema.findById(req.auth.id);
      if (!user || !user.isActive) {
        return res
          .status(401)
          .send({ status : 401, message: "Your account is not active. Access denied." });
      }

      // ถ้าผู้ใช้มีสถานะ active ให้ดำเนินการต่อไปยัง route ถัดไป
      next();
    } catch (error) {
      res.status(500).json({ message: error.toString() });
    }
  },
};

module.exports = middleware;
