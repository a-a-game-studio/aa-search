const express = require('express');

// Подключение системных классов
import BaseCtrl from '../../../System/BaseCtrl';
import * as System from '../../../Namespace/System'

var router = express.Router();

/**
 * Контроллер проверки отвечает API или нет
 */
class IndexController extends BaseCtrl {

   
}

/**
 * Проверка на работоспособность
 */
router.post('/aa/', function (req: System.MainRequest, res: any, next: any) {
    let self = new IndexController(req, res);
    res.send('POST API сервер работает');
});

/**
 * Проверка на работоспособность
 */
router.get('/aa/', function (req: System.MainRequest, res: any, next: any) {
    let self = new IndexController(req, res);
    res.send('API сервер работает');
});

export { router };