 
import { MainRequest, initMainRequest } from '../System/MainRequest';
import * as AAComponents from '@a-a-game-studio/aa-components/lib';

/* LEGO ошибок */
export default function InitBaseSysMiddleware(req: MainRequest, response: any, next: any) {

    req.sys = {
        bCache:false,
        token: '',
        errorSys: null,
        userSys: null,
        cacheSys: null,
        knexSys: null,
        logicSys: null,
        responseSys: null,
        bAuth: false,
        systemCore:null,
    }

    req.sys.errorSys = new AAComponents.ErrorSys(req.conf.common.env);    

    next();
}