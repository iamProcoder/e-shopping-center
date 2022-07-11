const RateLimit = require('graphql-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('../cache/redis');
const Boom = require('boom');

const limiter = RateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    client: redis,
    resetExpiryOnChange: true,
    expiry: 30,
  }),
  max: 1000,
  handler: (req, res, next) => {
    next(Boom.tooManyRequests());
  }
});

module.exports = limiter;
