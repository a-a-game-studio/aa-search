import express from 'express';
import {Response} from "express";
import {NextFunction} from "express";

import config from './Config/MainConfig'
import { MainRequest } from './System/MainRequest'


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
import RedisMiddleware from './Middleware/RedisMiddleware';

import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';

const numCPUs =  cpus().length;

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

    const app = express();

    // =========================
    // Базовая конфигурация expressa
    // =========================

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
    app.use(bodyParser.json({ limit: '50mb',extended: true }));

    const cors = require('cors');
    /*для подкл к API*/
    app.use(cors());
    app.options('*', cors());

    // Инициализация конфига
    app.use(function InitConfigMiddleware(req: MainRequest, res: any, next: any) {

        req.conf = config;

        next();
    });


    /* Инициализация базовых систем */
    app.use(InitBaseSysMiddleware);

    /** Конфигурирование приложения */
    app.use(ConfigMiddleware);

    app.use(RedisMiddleware)

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
    
    console.log(`Worker ${process.pid} started`);
}