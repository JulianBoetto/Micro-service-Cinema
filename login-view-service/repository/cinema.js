import base from "./base.js";
const apiUrl = process.env.API_GATEWAY_URL;

async function getCities(token) {
  return await base.get(token, `${apiUrl}/cities`);
}

export default { getCities };
