
import *  as Components  from '@a-a-game-studio/aa-components/lib';

// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';
import { KnexSys } from './KnexSys';
import { CacheSys } from './CacheSys';
import { LogicSys } from './LogicSys';
import Knex from 'knex';


/**
 * SQL Запросы
 */
export default class BaseSQL {

    protected db: Knex;
    protected redisSys: RedisSys;

    protected modelValidatorSys:  Components.ModelValidatorSys;
    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    protected knexSys: KnexSys;
    protected cacheSys: CacheSys;
    protected logicSys: LogicSys;

    constructor(req: MainRequest) {

        this.modelValidatorSys = new Components.ModelValidatorSys(req.sys.errorSys);
        this.knexSys = req.sys.knexSys;
        this.cacheSys = req.sys.cacheSys;
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.logicSys = req.sys.logicSys;

        if( req.infrastructure.mysql ){
            this.db = req.infrastructure.mysql;
        } else {
            this.errorSys.error('db_no_connection', 'Отсутствует подключение к mysql');
        }

        if( req.infrastructure.redis ){
            this.redisSys = req.infrastructure.redis;
        } else {
            this.errorSys.error('db_redis', 'Отсутствует подключение к redis');
        }
    }

}
