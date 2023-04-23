import base from "./base.js";
const apiUrl = process.env.API_GATEWAY_URL;
import redis from '../cache/cacheLayer.js';

async function getCities(token) {
  const cachedData = await redis.get('cities');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return await base.get(token, `${apiUrl}/cities`, 'cities');
}

export default { getCities };
