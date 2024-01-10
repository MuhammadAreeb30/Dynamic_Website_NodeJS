const exp = require("constants");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const User = require("./models/usermsg");
require("./db/connection");

const app = express();
const port = process.env.PORT || 3000;

// path setting
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

//routing
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    const userData = new User(req.body);
    console.log(userData)
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

// server creater
app.listen(port, () => {
  console.log(`server is runnig at port no ${port}`);
});