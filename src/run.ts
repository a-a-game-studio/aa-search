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

import * as middleware from './Namespace/Middleware';

/* Инициализация базовых систем */
app.use(middleware.InitBaseSysMiddleware);

/** Конфигурирование приложения */
app.use(middleware.ConfigMiddleware);

// кэш
const sharedMem = {};
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

import * as controller from './Namespace/Controller'

// Базовый модуль
app.use(controller.IndexController.router);

// Модуль для пользователей
// app.use(controller.UserController.router);

// Модуль для login
app.use(controller.LoginCtrl.router);

// Модуль для редактирования пользователей администратором
app.use(controller.AdminEditUserCtrl.router);

// Модуль для редактирования групп администратором
app.use(controller.AdminEditGroupCtrl.router);

// Модуль для редактирования ENUM дерева типов
app.use(controller.AdminEditEnumCtrl.router);


console.log('server start at http://localhost:'+config.common.port);
    app.listen(config.common.port);
