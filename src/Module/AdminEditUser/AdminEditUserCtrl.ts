const express = require('express');
// Подключение системных классов
// Подключение системных моделей
import { AdminEditUserM } from './AdminEditUserM';
import * as System from '../../Namespace/System'

import BaseCtrl from '../../System/BaseCtrl';

import {AdminEditUserR as R} from './AdminEditUserR'

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class AdminUserController extends BaseCtrl {

    public adminEditUserM: AdminEditUserM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.adminEditUserM = new AdminEditUserM(this.req);

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
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.init.action, () => {
        return ctrl.adminEditUserM.init(req.body);
    })
});

/**
 * Выбрать пользователя
 */
router.post(R.selectUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectUser.action, () => {
        return ctrl.adminEditUserM.selectUser(req.body);
    })
});

/**
 * Выбрать группу
 */
router.post(R.selectGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.selectGroup.action, () => {
        return ctrl.adminEditUserM.selectGroup(req.body);
    })
});

/**
 * Добавить пользователя к группе
 */
router.post(R.addUserToGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addUserToGroup.action, () => {
        return ctrl.adminEditUserM.addUserToGroup(req.body);
    })
});

/**
 * Удалить пользователя из группы
 */
router.post(R.delUserFromGroup.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delUserFromGroup.action, () => {
        return ctrl.adminEditUserM.delUserFromGroup(req.body);
    })
});

/**
 * Добавить пользователя
 */
router.post(R.addUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.addUser.action, () => {
        return ctrl.adminEditUserM.addUser(req.body);
    })
});

/**
 * Удалить пользователя
 */
router.post(R.delUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delUser.action, () => {
        return ctrl.adminEditUserM.delUser(req.body);
    })
});

/**
 * Сохранить пользователя
 */
router.post(R.saveUser.route, async (req: System.MainRequest, res: any, next: any) => {
    const ctrl = new AdminUserController(req, res);
    await ctrl.faInit();
    await ctrl.faAction(R.delUser.action, () => {
        return ctrl.adminEditUserM.saveUser(req.body);
    })
});

export { router };