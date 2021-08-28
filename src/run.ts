import express from 'express';
import {Response} from "express";
import {NextFunction} from "express";

import config from './Config/MainConfig'
import { MainRequest } from './System/MainRequest'

const app = express();

// =========================
// Базовая конфигурация expressa
// =========================

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());

// Инициализация конфига
app.use(function InitConfigMiddleware(req: MainRequest, res: any, next: any) {

    req.conf = config;

    next();
});

// =========================
// Подключение middleware
// =========================

import InitBaseSysMiddleware from './Middleware/InitBaseSysMiddleware';
import ConfigMiddleware from './Middleware/ConfigMiddleware';
import { SharedMemMiddleware } from './Middleware/SharedMemMiddleware';
import MySqlMiddleware from './Middleware/MySqlMiddleware';
import InitSubSysMiddleware from './Middleware/InitSubSysMiddleware';
import RequestSysMiddleware from './Middleware/RequestSysMiddleware';
import ResponseSysMiddleware from './Middleware/ResponseSysMiddleware';
import AuthSysMiddleware from './Middleware/AuthSysMiddleware';
import { gEngineCtrl } from './Module/Engine/EngineCtrl';
import { gIndexCtrl } from './Module/Common/IndexCtrl';


/* Инициализация базовых систем */
app.use(InitBaseSysMiddleware);

/** Конфигурирование приложения */
app.use(ConfigMiddleware);

// кэш
const sharedMem = {};
app.use(SharedMemMiddleware(sharedMem));

// база
app.use(MySqlMiddleware);

/** Инициализация подсистем */
app.use(InitSubSysMiddleware);

/* запрос */
app.use(RequestSysMiddleware);

/* ответ */
app.use(ResponseSysMiddleware);

/* проверка авторизации на уровне приложения */
app.use(AuthSysMiddleware);

// =========================
// Подключение контроллеров
// =========================




// Базовый модуль
app.use(gIndexCtrl);

// Модуль для пользователей
// app.use(controller.UserController.router);

// Модуль для редактирования пользователей администратором
app.use(gEngineCtrl);


console.log('server start at http://localhost:'+config.common.port);
    app.listen(config.common.port);
