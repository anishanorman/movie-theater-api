const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User");

userRouter.get("/", async (req, res) => {
  res.send(await User.findAll());
});

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id - 1
    const users = await User.findAll()
    res.send(users[id])
})

module.exports = userRouter;
