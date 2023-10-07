const express = require("express");

const { join } = require("path");

const db = require("./data/database");

const indexRoutes = require("./routes/index.routes");

const postsRoutes = require('./routes/posts.routes')

const app = express();


app.use(express.json())

app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);
app.use(postsRoutes);

app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500).render('authors/500');
  });
db.connectToDatabase().then(function () {
  app.listen(3000);
});
