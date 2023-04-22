import axios from "axios";

async function get(token, url) {
  if (!token) {
    console.error("You need a token to make this request.");
    return [];
  }
  if (!url) {
    console.error("You need an url to make this request.");
    return [];
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) return response.data;
    return [];
  } catch (error) {
    console.error(error.response ? error.response.data : error.response);
    if (error.response.status === 401) {
      return { error: "Token expired or invalid" };
    }
  }
}

export default { get };
