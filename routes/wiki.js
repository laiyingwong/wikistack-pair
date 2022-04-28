const express = require("express");
const wikiRouter = express.Router();
const { Page } = require("../models");
const addPage = require("../views/addPage");

wikiRouter.use(express.urlencoded({ extended: false }));

wikiRouter.get("/", (req, res, next) => {
  res.send("GET /wiki/");
});

wikiRouter.post("/", async (req, res, next) => {
  // res.json(req.body);
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/wiki");
  } catch (error) {
    next(error);
  }
});

wikiRouter.get("/add", (req, res, next) => {
  res.send(addPage());
});
module.exports = wikiRouter;
