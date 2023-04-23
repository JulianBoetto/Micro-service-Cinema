import redis from "../config/redis.js";
import { promisify } from "util";

async function set(key, value) {
  if (!key) return;
  const syncRedisSet = promisify(redis.set).bind(redis);
  return syncRedisSet(key, value);
}

async function get(key) {
  if (!key) return;
  const syncRedisGet = promisify(redis.get).bind(redis);
  return syncRedisGet(key);
}

export default { set, get };
