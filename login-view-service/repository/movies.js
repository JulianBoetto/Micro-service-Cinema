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

export default { getMovies };
