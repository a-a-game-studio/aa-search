 
import { MainRequest, initMainRequest } from '../System/MainRequest';
import { KnexSys } from '../System/KnexSys';
import { CacheSys } from '../System/CacheSys';
import { LogicSys } from '../System/LogicSys';

/* LEGO ошибок */
export default function InitSubSysMiddleware(req: MainRequest, response: any, next: any) {

    req.sys.knexSys = new KnexSys(req); // Система автоматизации написания SQL запросов
    req.sys.cacheSys = new CacheSys(req); // Система кеширования
    req.sys.logicSys = new LogicSys(req); // Система логики

    next();
}