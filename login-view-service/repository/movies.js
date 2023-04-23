import base from "./base.js";
const apiUrl = process.env.API_GATEWAY_URL;
import redis from '../cache/cacheLayer.js';

async function getMovies(token) {
  const cachedData = await redis.get('movies');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return await base.get(token, `${apiUrl}/movies`, 'movies');
}

async function getMoviesByCity(token, cityId) {
  const cachedData = await redis.get(`${cityId}-movies`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return await base.get(token, `${apiUrl}/cities/${cityId}/movies`, `${cityId}-movies`);
}

export default { getMovies, getMoviesByCity };
