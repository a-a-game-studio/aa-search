import { BaseCtrl, MainRequest } from "../../Namespace/System";
import { UserModule } from '@a-a-game-studio/aa-classes/lib';
import * as System from '../../Namespace/System'
const express = require('express');
const router = express.Router();

import {LoginR} from './LoginR'
import R = LoginR

import { LoginM } from './LoginM';

/**
 * Контроллер 
 */
export class UserController extends BaseCtrl {

    public loginM: LoginM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {

        // Инициализация бизнес моделей
        this.loginM = new LoginM(this.req);

    }

}

/**
 * INIT
 */
router.post(R.init.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.userSys.isAuth(); // Пробуем авторизироваться
    await ctrl.faAction('Страница логин', () => {
        return ctrl.loginM.init(req.body);
    })
});

/**
 * Войти в систему
 */
router.post(R.login.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Войти в систему', () => {
        return ctrl.loginM.login(req.body);
    })
});

/**
 * Зарегистрироваться
 */
router.post(R.register.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new UserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Зарегистрироваться', () => {
        return ctrl.loginM.register(req.body);
    })
});

export { router };
