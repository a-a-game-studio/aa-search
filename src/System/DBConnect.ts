import conf from '../Config/MainConfig'

import knex from 'knex'
var redis = require("redis");
import { RedisSys } from '@a-a-game-studio/aa-redis-sys/lib';

export const dbSearch = knex(conf.mysql);

export const redisSys = new RedisSys.RedisSys(conf.redis, redis.createClient(conf.redis));