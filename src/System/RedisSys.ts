var redis = require("redis");
export interface RedisConf {
    url: string;
}
/**
 * Обертка над редисом которая понимает async/await
 * 
 *  Для запуска redis в докере
 *  docker run -p 6379:6379 --name some-redis -d redis
 */
export class RedisSys {

    public redisClient: any;
    private conf: RedisConf;

    constructor(conf: RedisConf) {
        this.conf = conf;
        this.redisClient = redis.createClient(conf);
    }

    /**
     * Получить значение из редиса
     * @param key
     */
    public get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, function (err: any, reply: string) {
                if (err) {
                    resolve(null);
                }
                resolve(reply);
            });
        });
    };

    /**
     * Получить ключи по шаблону
     * @param keys
     */
    public keys(keys: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.redisClient.keys(keys, function (err: any, reply: any[]) {
                if (err) {
                    resolve(null);
                }
                resolve(reply);
            });
        });
    };

    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    public set(key: string, val: string | number, time: number = 3600) {
        this.redisClient.set(key, val, 'EX', time);
    }

    /**
     * Удалить ключи по ID
     * @param keys
     */
    public del(keys: any[]) {
        if (keys.length > 0) {
            this.redisClient.del(keys);
        }
    }
}
