import moviesRepository from "../repository/movies.js";
import cinemaRepository from "../repository/cinema.js";

async function getMovies(req, res, next) {
  const token = req.cookies.token;
  const response = await moviesRepository.getMovies(token);
  if (response && response.error) return res.redirect("/logout");

  const cities = await cinemaRepository.getCities(token);
  console.log(cities)
  if (cities && cities.error) return res.redirect("/logout");

  res.render("index", {
    movies: response,
    cities: cities,
  });
}

export default { getMovies };
