const express = require('express');

// Подключение системных классов
import BaseCtrl from '../../System/BaseCtrl';
import { MainRequest } from '../../System/MainRequest';
var router = express.Router();

/**
 * Контроллер проверки отвечает API или нет
 */
class IndexController extends BaseCtrl {

   
}

/**
 * Проверка на работоспособность
 */
router.post('/', function (req: MainRequest, res: any, next: any) {
    let self = new IndexController(req, res);
    res.send('POST API сервер работает');
});

/**
 * Проверка на работоспособность
 */
router.get('/', function (req: MainRequest, res: any, next: any) {
    let self = new IndexController(req, res);
    res.send('API сервер работает');
});

export { router };