import movies from "../repository/movies.js";

async function getMovies(token) {
  if(!token) return [];
  return await movies.getMovies(token);
}

export default { getMovies };
