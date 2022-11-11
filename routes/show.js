const { Router } = require("express")
const showRouter = Router()
const { Show, User } = require("../models");
const Sequelize = require("sequelize")
const getTitles = require("../src/functions")

function reformat(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

showRouter.get("/", async (req, res) => {
    res.send(await Show.findAll());
});

showRouter.get("/:showId", async (req, res) => {
    const showId = req.params.showId
    const show = await Show.findByPk(showId)
    res.send(show)
})

showRouter.get("/genre/:genre", async (req, res) => {
    var genre = req.params.genre
    genre = reformat(genre)
    const shows = await Show.findAll({ where: { genre: genre } })
    res.send(`Shows with the genre ${genre}: ${getTitles(shows)}`)
})

showRouter.put("/:showId/update/status", async (req, res) => {
    const showId = req.params.showId
    const show = await Show.findByPk(showId)
    if (show.status === "cancelled") {
        await show.update({ status: "on-going" })
        res.send(`${show.title}'s status has been set to on-going!`)
    } else {
        await show.update({ status: "cancelled" })
        res.send(`${show.title}'s status has been set to cancelled!`)
    }
})

module.exports = showRouter