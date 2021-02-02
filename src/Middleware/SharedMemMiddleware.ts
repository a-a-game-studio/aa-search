// Подключение системных классов
import { MainRequest } from '../System/MainRequest';
import { SharedMemSys } from '@a-a-game-studio/aa-redis-sys/lib';
import { MemSysI } from '@a-a-game-studio/aa-redis-sys/lib/CacheSys';

/**
 * Поключенеи к SharedMemSys
 * возвращает ф-ю middleware
 * @param globalMem  - общая переменная в памяти. Лежит вне модулей
 * 
 * пример использованя:
 * const globalMem:MemSysI = {};
 * objExpress.use(SharedMemMiddleware(globalMem));
 */
export const SharedMemMiddleware = (globalMem: MemSysI) => {

    /**
     * @param req 
     * @param res 
     * @param next 
     */
    return (req: MainRequest, res: any, next: any) => {     

        if (req.sys.errorSys.isOk()) {

            console.log('SharedMemSys connection...');
            req.infrastructure.redis = new SharedMemSys.SharedMemSys(globalMem);

        }
        console.log('connection SharedMemSys complete;');

        next();
    }


}
