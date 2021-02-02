// Подключение системных классов
import { MainRequest } from '../System/MainRequest';
import { RabbitSenderSys } from '../System/RabbitSenderSys';

/**
 * Подключение к кролику
 * @param req 
 * @param res 
 * @param next 
 */
export default async function RabbitMiddleware(req: MainRequest, res: any, next: any) {
   
    if(!req.conf.rabbit){
        req.sys.errorSys.error('not_config_rabbit', 'Не указан конфиг rabbit');
    }

    
    if( req.sys.errorSys.isOk() ){      
        console.log('rabbit connection...');
        req.infrastructure.rabbit = await RabbitSenderSys.Init(req.conf.rabbit.connection, req.conf.rabbit.queryList);
    }
    console.log('connection rabbit complete;');

    next();
}

