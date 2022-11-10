const express = require("express")
const app = express()
const userRouter = require("./routes/user")
const showRouter = require("./routes/show")
const db = require("./db/db")

app.use(express.json())

app.use("/user", userRouter)
app.use("/showRouter", showRouter)

app.get("/sync", async (req, res) => {
    await db.sync({force: true})
    res.sendStatus(200)
})

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})

module.exports = app