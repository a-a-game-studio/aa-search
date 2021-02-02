// Подключение системных классов
import { MainRequest } from '../System/MainRequest';
import { RedisSys } from '@a-a-game-studio/aa-redis-sys/lib';
var redis = require("redis");


/**
 * Пключенеи к редису
 * @param req 
 * @param res 
 * @param next 
 */
export default async function RedisMiddleware(req: MainRequest, res: any, next: any) {

    if (!req.conf.redis) {
        req.sys.errorSys.error('not_config_redis', 'Не указан конфиг redis');
    }

    if (req.sys.errorSys.isOk()) {

        console.log('redis connection...');
        req.infrastructure.redis = new RedisSys.RedisSys(req.conf.redis, redis.createClient(req.conf.redis));

    }
    console.log('connection redis complete;');

    next();
}

