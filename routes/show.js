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

showRouter.put("/:showId/updaterating/:newRating", async (req, res) => {
    const showId = req.params.showId
    const newRating = req.params.newRating
    const show = await Show.findByPk(showId)
    await show.update({ rating: newRating })
    res.send(`${show.title}'s rating has been updated to ${newRating}!`)
})

showRouter.put("/:showId/updatestatus", async (req, res) => {
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

showRouter.delete("/:showId/delete", async (req, res) => {
    const show = await Show.findByPk(req.params.showId)
    await show.destroy()
    res.send(`${show.title} has now been deleted from the database. Bye, ${show.title}!`)
})

module.exports = showRouter