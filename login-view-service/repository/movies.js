import base from "./base.js";
const apiUrl = process.env.API_GATEWAY_URL;

async function getMovies(token) {
  return await base.get(token, `${apiUrl}/movies`);
}

export default { getMovies };
