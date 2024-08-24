var express = require("express");
var router = express.Router();
const userSchema = require("../models/user.model");
const {
  authToken,
  checkIsActive,
} = require("../middleware/auth.middleware.js");

router.put(
  "/approve/:id",
  [authToken, checkIsActive],
  async function (req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);

      let users = await userSchema.findById(id);

      await userSchema.findByIdAndUpdate(id, { isActive: true });

      res.status(201).send({ status : "201" ,message: `approve success ${users.name} ` });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
);

module.exports = router;
