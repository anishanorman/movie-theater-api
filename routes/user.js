const { Router, express } = require("express")
const userRouter = Router()
const users = require("../users.json")

userRouter.get("/users", async (req, res) => {
    res.send(users)
})

userRouter.get("/users/:id", async (req, res) => {
    const id = req.params.id - 1
    res.send(users[id])
})

module.exports = userRouter