const express = require('express');
// Подключение системных классов

// Подключение системных моделей
import { InsertM } from './Model/InsertM'

import BaseCtrl from '../../System/BaseCtrl'

import {EngineR} from './EngineR'
import R = EngineR;
import { MainRequest } from '../../System/MainRequest';
import { SchemaM } from './Model/SchemaM';

const router = express.Router();

/**
 * API для Админки
 * Редактирование и управление пользователями, а так-же их правами
 */
class Ctrl extends BaseCtrl {

    public insertM: InsertM;
    public schemaM: SchemaM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.insertM = new InsertM(this.req);
        this.schemaM = new SchemaM(this.req);

    }
}

router.post(R.insert.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Вставка данных', () => {
        return ctrl.insertM.insert(req.body);
    })
});

router.post(R.createTable.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Создать таблицы', () => {
        return ctrl.schemaM.createTable(req.body);
    })
});

router.post(R.delTable.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Удаление таблицы', () => {
        return ctrl.schemaM.delTable(req.body);
    })
});

router.post(R.clearTable.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new Ctrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Очистка таблицы', () => {
        return ctrl.schemaM.clearTable(req.body);
    })
});


export { router as gEngineCtrl } ;