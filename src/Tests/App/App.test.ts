import * as middleware from '../../Namespace/Middleware';


const sharedMem = {};


import express from 'express';

import { conf } from './MainConfigTest'
import { MainRequest } from '../../System/MainRequest'

const app = express();

// =========================
// Базовая конфигурация expressa
// =========================

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

const cors = require('cors');

/*для подкл к API*/
app.use(cors());
app.options('*', cors());

app.use(express.static(__dirname + '/../../../src/Tests/App/public'));

// Инициализация конфига
app.use(function InitConfigMiddleware(req: MainRequest, res: any, next: any) {

    req.conf = conf;

    next();
});

// =========================
// Подключение middleware
// =========================


/* Инициализация базовых систем */
app.use(middleware.InitBaseSysMiddleware);

/** Конфигурирование приложения */
app.use(middleware.ConfigMiddleware);

// кэш
app.use(middleware.SharedMemMiddleware(sharedMem));

// база
app.use(middleware.MySqlMiddleware);

/** Инициализация подсистем */
app.use(middleware.InitSubSysMiddleware);

/* запрос */
app.use(middleware.RequestSysMiddleware);

/* ответ */
app.use(middleware.ResponseSysMiddleware);

/* проверка авторизации на уровне приложения */
app.use(middleware.AuthSysMiddleware);

// =========================
// Подключение контроллеров
// =========================

import * as controller from '../../Namespace/Controller'

// Базовый модуль
app.use(controller.IndexController.router);

// Модуль для пользователей
// app.use(controller.UserController.router);

// Модуль для login
app.use(controller.LoginCtrl.router);



// файлы
app.use(controller.FileCtrl.router);

app.use(controller.FileCtrl.router);



console.log('server start at http://localhost:' + conf.common.port);
app.listen(conf.common.port);





