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

  res.render("dashboard/index", {
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
  res.render("dashboard/index", {
    movies: moviesByCity,
    cities,
    filterCityBtn,
  });
}

export default { getAllMovies, getMoviesByCity };
