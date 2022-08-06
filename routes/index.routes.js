const router = require("express").Router();
const authRoutes = require("./auth.routes");
const contactRoutes = require("./contacts.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({name:"arturo",number:"123456789"});
});

router.use("/auth", authRoutes);
router.use("/contact",contactRoutes)
module.exports = router;
