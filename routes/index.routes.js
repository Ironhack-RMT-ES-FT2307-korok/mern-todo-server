const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const todoRouter = require("./todo.routes")
router.use("/todo", todoRouter)

module.exports = router;
