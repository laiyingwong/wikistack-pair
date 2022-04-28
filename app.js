const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const layout = require("./views/layout");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");
app.use("/wiki", wikiRouter);

const { db, Page, User } = require("./models");

db.authenticate().then(() => {
  console.log("connected to the database");
});

// Logs information about each incoming request.
app.use(morgan("dev"));

// Serves up static files from the public folder
const middleware = express.static(path.join(__dirname, "public"));

// Parses the request body.
app.use(express.urlencoded({ extended: false }));

// GET /
// POST /
// GET /add
// GET /user
app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.get("users", (req, res) => {
  res.send();
});

const init = async () => {
  // await Page.sync();
  // await User.sync();

  // Database sync
  // this drops all tables then recreates them based on our JS definitions
  await db.sync({ force: true });
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

init();
