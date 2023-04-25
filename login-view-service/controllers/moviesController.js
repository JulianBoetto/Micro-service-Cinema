import url from "url";
import moviesRepository from "../repository/movies.js";
import cinemaRepository from "../repository/cinema.js";

let filterCityBtn = { _id: "all", city: "All" };

async function getAllMovies(req, res, next) {
  const token = req.cookies.token;
  const { city } = req.query;

  const response = await moviesRepository.getMovies(token);
  if (!response || response.error) return res.redirect("/logout");

  const cities = await cinemaRepository.getCities(token);
  if (city && city !== "all")
    filterCityBtn = cities.find((el) => {
      return el._id === city;
    });
  else if (city && city === "all" && city !== filterCityBtn._id)
    filterCityBtn = { _id: "all", city: "All" };

  if (!cities || cities.error) return res.redirect("/logout");

  res.render("dashboard/moviesByCity", {
    movies: response,
    cities: cities,
    filterCityBtn,
  });
}

async function getMoviesByCity(req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  const token = req.cookies.token;

  const moviesByCity = await moviesRepository.getMoviesByCity(
    token,
    queryObject.city
  );
  if (!moviesByCity || moviesByCity.error) return res.redirect("/logout");

  const cities = await cinemaRepository.getCities(token);
  if (queryObject.city && queryObject.city !== "all")
    filterCityBtn = cities.find((el) => {
      return el._id === queryObject.city;
    })
      ? cities.find((el) => {
          return el._id === queryObject.city;
        })
      : { _id: queryObject.city, city: queryObject.city };

  if (!cities || cities.error) return res.redirect("/logout");

  console.log(filterCityBtn);
  res.render("dashboard/moviesByCity", {
    movies: moviesByCity,
    cities,
    filterCityBtn,
  });
}

async function renderCreateMovie(req, res, next) {
  const token = req.cookies.token;
  res.render("dashboard/createMovie", { token });
}

async function createMovie(req, res, next) {
  const movie = {
    title: req.body.title,
    synopsis: req.body.synopsis,
    duration: Number(req.body.duration),
    releaseDate: req.body.releaseDate,
    image: `uploads/${req.file.filename}`,
    categories: req.body.categories.split(",")
  };

  const newMovie = await moviesRepository.createMovie(req.cookies.token, movie);
  if (!newMovie || newMovie.error) return res.redirect("/logout");

  console.log(newMovie)
  return res.render('dashboard/createdMovie', newMovie)
}

export default {
  getAllMovies,
  getMoviesByCity,
  renderCreateMovie,
  createMovie,
};
