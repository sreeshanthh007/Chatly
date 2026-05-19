

import { CONFIG } from "@shared/config";
import { logger } from "@shared/utils/logger";
import redis from "ioredis"


export const redisClient = new redis({
    host: CONFIG.REDIS_HOST,
    port: CONFIG.REDIS_PORT,

});

redisClient.on("connect", () => {
    logger.info("Redis connected");
})


redisClient.on("error", (err) => {
    logger.error(err);
});