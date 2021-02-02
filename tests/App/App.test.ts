import { App } from '../../src/App';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import * as Middleware from '../../src/Namespace/Middleware';
import { MainRequest, UserSys } from '../../src/Namespace/System';

import { conf } from "./MainConfigTest";

const sharedMem = {};

// /* Пример переопредления класса пользователя */
// class MyUserSys extends UserSys {
//     constructor(req: System.MainRequest, listDB: AAClasses.BaseModule.ListDB) {
//         super(req, listDB);
//         console.log('Change UserActions');
//     }
// }

// /* Пример переопределения AuthSysMiddleware */
// class MyAuthSysMiddleware extends Middleware.AuthSysMiddleware {
//     protected fInitUser(req: System.MainRequest): UserSys {
//         console.log('Init UserSys');
//         return new MyUserSys(req, this.listDB);
//     }
// }

const app = new App(conf)
        .fUseMySql();

/* Ф-я запуска приложения */
async function faRunServer() {
    console.log('Starting App...');

    await app.faInstall();

    app.fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseDefaultIndex()
        .fUseSharedMem(sharedMem)
        .fUseFileModule()
        ;

    /* Иницализируем модуль аторизации */
    await app.faUseAuthSys();

    // app.fUseAdminUser() // Контролер администрирования пользователей
    //     .fUseUserCtrl() // Контролер пользователя
    //     .fStart(); // Запускаем приложение

} // faRunServer

// faRunServer();

app.faRunDefaultMigration();





