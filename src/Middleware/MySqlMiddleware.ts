// Подключение системных классов
import { MainRequest } from '../System/MainRequest';

/**
 * Подключнеие к MySQl
 * @param req 
 * @param res 
 * @param next 
 */
export default async function MySqlMiddleware(req: MainRequest, res: any, next: any) {

    if(!req.conf){
        req.sys.errorSys.error('not_config', 'Не указан конфиг');
    }

    if(!req.conf.mysql){
        req.sys.errorSys.error('not_config_mysql', 'Не указан конфиг mysql');
    }

    if( req.sys.errorSys.isOk() ){
        console.log('mysql connection...');
        req.infrastructure.mysql = require('knex')(req.conf.mysql);             
    }
    console.log('connection mysql complete;');

    next();
}

