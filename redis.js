const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://default:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@redis:6379'
});

redisClient.on('error', err => console.error('Redis error:', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
