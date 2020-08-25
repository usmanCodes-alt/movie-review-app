const express = require("express");
const methodOverride = require("method-override");
const response = require("./utils/api_call");
require("./db/mongoose");
const Movie = require("./model/movie_model");
const { findOneAndDelete } = require("./model/movie_model");
const app = express();
const port = 4000 || process.env.PORT;

let lastSearch = "";

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("", async (req, res) => {
  try {
    let movies = await Movie.find({});
    if (movies.length == 0 && movies[0] == undefined) {
      movies = "";
    }
    res.render("index", { data: "", notFound: false, movies });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/movie-data", async (req, res) => {
  try {
    const name = req.query.movieName;
    let notFound = false;
    let movies = await Movie.find({});
    if (movies.length == 0 && movies[0] == undefined) {
      movies = "";
    }
    response(name)
      .then((result) => {
        let data = result;
        if (data.Response == "False") {
          data = "";
          notFound = true;
        }
        lastSearch = data;
        res.render("index", {
          data: data,
          notFound: notFound,
          movies,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "unexpected error has occured, please try again later",
        });
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/add-favourite", async (req, res) => {
  try {
    const name = lastSearch.Title.toUpperCase();
    const rating = lastSearch.imdbRating;
    const duplicate = await Movie.findOne({ title: name });
    if (duplicate) {
      return res.send({ message: "movie already added" });
    }
    const movie = new Movie({
      title: name,
      IMDB_rating: rating,
    });
    await movie.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/delete-favourite", async (req, res) => {
  try {
    await Movie.findOneAndDelete({
      title: req.body.name,
    });
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
