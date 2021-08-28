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

    public insertM: InsertM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.insertM = new InsertM(this.req);

    }
}

router.post(R.insert.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('INIT', () => {
        return ctrl.insertM.insert(req.body);
    })
});


export { router as gEngineCtrl } ;