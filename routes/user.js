const { Router } = require("express");
const { Show } = require("../models");
const userRouter = Router();
const { User } = require("../models/User");

function getTitles(array) {
    list = ""
    for (i in array) {
        if (i == 0) {
            list+=array[i].title
        }
        else if (i == array.length-1) {
            list+=` and ${array[i].title}`
        } else {
            list+= `, ${array[i].title}`
        }
    }
    return list
}

userRouter.get("/", async (req, res) => {
  res.send(await User.findAll());
});

userRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    const user = await User.findByPk(userId)
    res.send(user)
})

userRouter.get("/:userId/shows", async (req, res) => {
    const userId = req.params.userId
    const shows = await User.findByPk(userId, { include: Show })

    res.send(`Shows that User ${userId} has watched: ${getTitles(shows.shows)}`)
})

userRouter.put("/:userId/shows/:showId", async (req, res) => {
    const userId = req.params.userId
    const showId = req.params.showId
    const user = await User.findByPk(userId)
    const show = await Show.findByPk(showId)
    await user.addShow(show)
    res.send(`Added ${show.title} to User ${user.id}!`)
})

module.exports = userRouter;
