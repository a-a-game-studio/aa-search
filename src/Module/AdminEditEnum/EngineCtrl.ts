const express = require('express');
// Подключение системных классов

// Подключение системных моделей
import { InsertM } from './Model/InsertM'

import BaseCtrl from '../../System/BaseCtrl'

import {EngineR} from './EngineR'
import R = EngineR;
import { MainRequest } from '../../System/MainRequest';

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl {

    public vInsertM: InsertM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.vInsertM = new InsertM(this.req);

        //==================================================

        // Проверка авторизации
        await this.userSys.isAuth();

        // Проверка права доступа на модуль
        await this.userSys.isAccessCtrl('admin-edit-user');

        // Проверка являетесь ли вы администратором
        this.userSys.isAdmin();
    }
}

router.post(R.insert.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('INIT', () => {
        return ctrl.adminEditUserM.insert(req.body);
    })
});


export { router };