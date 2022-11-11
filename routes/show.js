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

module.exports = showRouter