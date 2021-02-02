// Подключение системных классов
import { MainRequest } from '../System/MainRequest';

/* LEGO ошибок */
export default async function ConfigMiddleware(req: MainRequest, res: any, next: any) {

    req.infrastructure = {
        mysql: null,
        redis: null,
        rabbit: null
    }

    if(!req.conf){
        req.sys.errorSys.error('not_config', 'Не указан конфиг');
    }

    next();
}

