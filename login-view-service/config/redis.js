import { Redis } from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.error(err);
  console.log("Please, run 'docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest'")
});

export default redis;
