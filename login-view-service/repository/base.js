import axios from "axios";
import redis from "../cache/cacheLayer.js";

async function get(token, url, key) {
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

    if (response.status === 200) {
      console.log("base.js", key);
      if (key) await redis.set(key, JSON.stringify(response.data));
      return response.data;
    }
    return [];
  } catch (error) {
    console.error(error.response ? error.response.data : error.response);
    if (error.response && error.response.status === 401) {
      return { error: "Token expired or invalid" };
    }
  }
}

export default { get };
