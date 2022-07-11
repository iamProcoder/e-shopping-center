const Redis = require("ioredis");
const redis = new Redis({
    port: process.env.REDIS_PORT || 6379, // Redis port
    host: process.env.REDIS_HOST || "127.0.0.1", // Redis host
  });

module.exports = redis;
