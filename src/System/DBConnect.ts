import conf from '../Config/MainConfig'

import knex from 'knex'
import { RedisSys } from './RedisSys';
var redis = require("redis");

export const dbSearch = knex(conf.mysql);

export const redisSys = new RedisSys(conf.redis);