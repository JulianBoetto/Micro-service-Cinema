import axios from "axios";
const apiUrl = process.env.API_GATEWAY_URL;

async function getMovies(token) {
  if (!token) {
    console.error("You need a token to make this request.");
    return [];
  }
  try {
    const response = await axios.get(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default { getMovies };
