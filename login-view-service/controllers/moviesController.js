import moviesRepository from "../repository/movies.js";
import cinemaRepository from "../repository/cinema.js";

async function getMovies(req, res, next) {
  let filterCityBtn = { _id: "all", city: "All" };
  const token = req.cookies.token;
  const { city } = req.query;

  const response = await moviesRepository.getMovies(token);
  if (!response || response.error) return res.redirect("/logout");

  const cities = await cinemaRepository.getCities(token);
  if (city !== "all")
    filterCityBtn = cities.find((el) => {
      return el._id === city;
    });

  if (!cities || cities.error) return res.redirect("/logout");

  res.render("index", {
    movies: response,
    cities: cities,
    filterCityBtn,
  });
}

export default { getMovies };
