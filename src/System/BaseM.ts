// Системные сервисы
import *  as Components  from '@a-a-game-studio/aa-components/lib';
import { UserSys } from './UserSys';
import { MainRequest } from './MainRequest';
import { LogicSys } from './LogicSys';
/**
 * Базовая модель
 */
export default class BaseM {

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    protected req: MainRequest;
    protected logicSys: LogicSys;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
        this.logicSys = req.sys.logicSys;
        this.req = req;
        
    }

}
