// Системные сервисы
import { MainRequest } from './MainRequest';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import { UserSys } from './UserSys';

/**
 * Конструктор для консольных комманд
 */
export default class BaseCommand {

    public db: any;

    public errorSys: AAClasses.Components.ErrorSys;
    public userSys: UserSys;

    constructor(req: MainRequest) {

        this.db = require('knex')(req.conf.mysql);

        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }

}
