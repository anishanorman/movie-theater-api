const { Router } = require("express")
const showRouter = Router()
const { Show } = require("../models/Show")

showRouter.get("/", async (req, res) => {
    res.send(await Show.findAll());
  });

module.exports = showRouter