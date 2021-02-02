const express = require('express');
// Подключение системных классов
import * as System from '../../Namespace/System'

// Подключение системных моделей
import { AdminEditEnumM } from './AdminEditEnumM'

import BaseCtrl from '../../System/BaseCtrl'

import {AdminEditEnumR} from './AdminEditEnumR'
import R = AdminEditEnumR;

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl {

    public adminEditUserM: AdminEditEnumM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditEnumM(this.req);

        //==================================================

        // Проверка авторизации
        await this.userSys.isAuth();

        // Проверка права доступа на модуль
        await this.userSys.isAccessCtrl('admin-edit-user');

        // Проверка являетесь ли вы администратором
        this.userSys.isAdmin();
    }
}

router.post(R.init.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('INIT', () => {
        return ctrl.adminEditUserM.init(req.body);
    })
});

router.post(R.getEnumTreeType.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Получить enum дерево типов', () => {
        return ctrl.adminEditUserM.getEnumTreeType(req.body);
    })
});

router.post(R.selectEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Выбрать enum', () => {
        return ctrl.adminEditUserM.selectEnum(req.body);
    })
});

router.post(R.selectEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Выбрать enum параметр', () => {
        return ctrl.adminEditUserM.selectEnumParam(req.body);
    })
});

router.post(R.delEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удалить параметр enum', () => {
        return ctrl.adminEditUserM.delEnumParam(req.body);
    })
});

router.post(R.addEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Добавить enum', () => {
        return ctrl.adminEditUserM.addEnum(req.body);
    })
});

router.post(R.delEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удалить enum', () => {
        return ctrl.adminEditUserM.delEnum(req.body);
    })
});
router.post(R.delEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удалить enum параметр', () => {
        return ctrl.adminEditUserM.delEnumParam(req.body);
    })
});

router.post(R.saveEnum.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Сохранить enum', () => {
        return ctrl.adminEditUserM.saveEnum(req.body);
    })
});

router.post(R.saveEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Сохранить enum параметр', () => {
        return ctrl.adminEditUserM.saveEnumParam(req.body);
    })
});

router.post(R.addEnumParam.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Добавить enum параметр', () => {
        return ctrl.adminEditUserM.addEnumParam(req.body);
    })
});

export { router };