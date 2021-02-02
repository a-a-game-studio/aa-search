const express = require('express');
// Подключение системных классов
import * as System from '../../Namespace/System'

// Подключение системных моделей
import { AdminEditGroupM } from './AdminEditGroupM'

import BaseCtrl from '../../System/BaseCtrl'

import {AdminEditGroupR} from './AdminEditGroupR'
import R = AdminEditGroupR;

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl {

    public adminEditUserM: AdminEditGroupM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditGroupM(this.req);

        //==================================================

        // Проверка авторизации
        await this.userSys.isAuth();

        // Проверка права доступа на модуль
        await this.userSys.isAccessCtrl('admin-edit-user');

        // Проверка являетесь ли вы администратором
        this.userSys.isAdmin();

    }
}

/**
 * INIT
 */
router.post(R.init.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    })
});

/**
 * Выбрать группу
 */
router.post(R.selectGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    })
});

/**
 * Выбрать контроллер доступа
 */
router.post(R.selectCtrlAccess.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectCtrlAccess.action, () => {
        return ctrl.adminEditUserM.selectCtrlAccess(req.body);
    })
});

/**
 * Добавить контроллер доступа группе
 */
router.post(R.addCtrlAccessToGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addCtrlAccessToGroup.action, () => {
        return ctrl.adminEditUserM.addCtrlAccessToGroup(req.body);
    })
});

/**
 * Удалить контроллер из группы
 */
router.post(R.delCtrlAccessFromGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delCtrlAccessFromGroup.action, () => {
        return ctrl.adminEditUserM.delCtrlAccessFromGroup(req.body);
    })
});

/**
 * Добавить группу
 */
router.post(R.addGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addGroup.action, () => {
        return ctrl.adminEditUserM.addGroup(req.body);
    })
});

/**
 * Удалить группу
 */
router.post(R.delGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delGroup.action, () => {
        return ctrl.adminEditUserM.delGroup(req.body);
    })
});

/**
 * Сохранить группу
 */
router.post(R.saveGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.saveGroup.action, () => {
        return ctrl.adminEditUserM.saveGroup(req.body);
    })
});

/**
 * Сохранить контроллер доступа
 */
router.post(R.saveCtrlAccess.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.saveCtrlAccess.action, () => {
        return ctrl.adminEditUserM.saveCtrlAccess(req.body);
    })
});

/**
 * Добавить контроллер доступа
 */
router.post(R.addCtrlAccess.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addCtrlAccess.action, () => {
        return ctrl.adminEditUserM.addCtrlAccess(req.body);
    })
});

export { router };