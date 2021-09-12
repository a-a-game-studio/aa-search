// Подключение системных классов
import { MainRequest } from '../System/MainRequest';
import { redisSys } from '../System/DBConnect';
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

        // console.log('redis connection...');
        req.infrastructure.redis = redisSys;
        if(redisSys.redisMaster && redisSys.redisScan){
            req.sys.bCache = true;
        }

    }
    // console.log('connection redis complete;');

    next();
}

