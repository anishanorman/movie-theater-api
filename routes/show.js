const { Router } = require("express")
const showRouter = Router()
const { Show } = require("../models/Show")

showRouter.get("/", async (req, res) => {
    res.send(await Show.findAll());
});

showRouter.get("/:showId", async (req, res) => {
    const showId = req.params.showId
    const show = await Show.findByPk(showId)
    res.send(show)
})

module.exports = showRouter