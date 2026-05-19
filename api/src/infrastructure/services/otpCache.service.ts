import { IOtpCacheService } from "@domain/interfaces/services/otpCache.service.interface";
import { redisClient } from "@infrastructure/cache/redis";



export class OtpCacheService implements IOtpCacheService{

    async get(key: string): Promise<string | null> {
        return await redisClient.get(key)
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        await redisClient.set(key, value, "EX", ttl)
    }

    async del(key: string): Promise<void> {
        await redisClient.del(key)
    }
}