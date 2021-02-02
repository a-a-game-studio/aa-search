import { SysteCoreModule, Components, WalletModule, FileModule } from '@a-a-game-studio/aa-classes/lib';

const bodyParser = require('body-parser');
const cors = require('cors');
import db from "knex";

import express from 'express';
// Подключене системных файлов
import * as Middleware from './Namespace/Middleware'
import * as System from './Namespace/System'
import * as Controller from './Namespace/Controller'

// Базовый модуль
import * as IndexController from './Module/Common/Controller/IndexController';


import { AppDefaultMigration } from './AppDefaultMigration';
import { ListDBI, ListDB } from '@a-a-game-studio/aa-classes/lib/BaseClass/ListDB';
import { MemSysI } from '@a-a-game-studio/aa-redis-sys/lib/CacheSys';
import { SharedMemSys } from '@a-a-game-studio/aa-redis-sys/lib';

import * as FileCtrl from "./Module/File/FileCtrl";
import { CacheSys } from './System/CacheSys';



/**
 * Класс приложения со всеми компонентами
 */
export class App {

    protected iPort: number; // порт подключения
    protected bodyMaxSize: string = '50mb'; // размер body
    protected conf: System.ConfI; // конфиг
    protected reddis: System.RedisSys; // Redis

    protected bUseMySql: boolean; // флаг использования MySql
    protected bUseRabbitSender: boolean;  // флаг использования RabbitSender
    protected bUseReddis: boolean; // флаг использования Reddis
    protected bUseAuthSys: boolean; // флаг использования AuthSys
    protected bUserCtrl: boolean; // флаг использования UserCtrl
    protected bUseAAClasses: boolean; // флаг использования UserCtrl

    public objExpress: express.Express;
    public errorSys: Components.ErrorSys

    public objDb: db; // подключение к базе

    protected listDBData: ListDBI;
    protected listDB: ListDB;


    constructor(conf: System.ConfI, iPort: number = 3005) {

        this.bUseMySql = false;
        this.bUseRabbitSender = false;
        this.bUseReddis = false;
        this.bUseAuthSys = false;
        this.bUserCtrl = false;
        this.bUseAAClasses = false;

        this.objExpress = express(); // уст. Express

        this.conf = conf; // уст. конфиг

        this.iPort = iPort; // уст. порт

        this.errorSys = new Components.ErrorSys(this.conf.common.env);

        

        /* Подключаем конфиг */
        this.objExpress.use((req: System.MainRequest, resp: any, next: any) => {
            req.conf = this.conf;
            req.infrastructure = {
                mysql: null,
                redis: null,
                rabbit: null,
            }
            next();
        }); // уст. конфиг

        /* LEGO ошибок */
        this.objExpress.use((req: System.MainRequest, response: any, next: any) => {

            req.sys = {
                token: '',
                errorSys: null,
                knexSys: null,
                logicSys: null,
                cacheSys: null,
                userSys: null,
                responseSys: null,
                bAuth: false,
                systemCore: null,
            }

            req.sys.errorSys = this.errorSys;
            next();
        });

        /* запрос */
        this.objExpress.use(Middleware.RequestSysMiddleware);

        /* ответ */
        this.objExpress.use(Middleware.ResponseSysMiddleware);

    }

    /**
     * отключить Cors
     */
    public fDisableCors(): App {
        this.objExpress.use(cors());
        this.objExpress.options('*', cors());

        return this;
    }

    /**
     * Размер тела запроса
     * @param size 
     */
    public fSetBodyMaxSize(iSize: number): App {
        if (iSize <= 0) {
            throw 'bodyMaxSize mast be more than zero'
        }
        this.bodyMaxSize = iSize + 'mb';

        return this;
    }

    /**
     * Использоватть bodyParser с дефолтными настройками
     */
    public fUseBodyParser(): App {
        this.objExpress.use(bodyParser.urlencoded({ limit: this.bodyMaxSize, extended: true }));
        this.objExpress.use(bodyParser.json({ limit: this.bodyMaxSize, extended: true }));
        return this;
    }

    /**
     * запуск приложения
     */
    public fStart(): void {
        console.log('server start at http://localhost:' + this.iPort);
        this.objExpress.listen(this.iPort);
    }

    /**
     * Использовать MySql
     */
    public fUseMySql(): App {

        if (!this.conf.mysql) {
            console.log('Config mysql connection is empty');
            process.exit(1);
        };

        this.objDb = db(this.conf.mysql);
        this.objExpress.use((req: System.MainRequest, resp: any, next: any) => {
            req.infrastructure.mysql = this.objDb;
            next();
        }); // уст. конфиг

        this.bUseMySql = true;

        return this;
    }

    /**
     * Использовать Reddis
     */
    public fUseReddis(): App {

        if (!this.conf.redis) {
            console.log('Config redis connection is empty');
            process.exit(1);
        };

        // this.reddis.fSetUse(true);
        this.reddis = new System.RedisSys(this.conf.redis);
        
        this.objExpress.use((req: System.MainRequest, resp: any, next: any) => {
            req.infrastructure.redis = this.reddis;
            req.sys.cacheSys = new CacheSys(req); // Система кеширования
            next();
        }); // уст. конфиг

        this.bUseReddis = true;

        return this;
    }

    /**
     * Использовать SharedMem
     * заменяет redis
     */
    public fUseSharedMem(globalMem: MemSysI): App {    
        
        this.objExpress.use((req: System.MainRequest, resp: any, next: any) => {
            req.infrastructure.redis = new SharedMemSys.SharedMemSys(globalMem);
            req.sys.cacheSys = new CacheSys(req); // Система кеширования
            next();
        }); // уст. конфиг

        this.bUseReddis = true;

        return this;
    }

    /**
     * Ипользование отправки в RabbitMQ
     */
    public async faUseRabbitSender(): Promise<App> {

        if (!this.conf.rabbit.connection) {
            console.log('Config rabbit connection is empty');
            process.exit(1);
        };

        let rabbitSender = await System.RabbitSenderSys.Init(
            this.conf.rabbit.connection,
            this.conf.rabbit.queryList
        );

        this.objExpress.use((req: System.MainRequest, resp: any, next: any) => {
            req.infrastructure.rabbit = rabbitSender;
            next();
        }); // уст. конфиг

        this.bUseRabbitSender = true;

        return this;
    }

    /**
     * Использование AuthSys
     */
    public async faUseAuthSys(): Promise<App> {

        if (!this.bUseMySql) {
            console.log('faUseAuthSys: MySql is not used');
            process.exit(1);
        };

        /* проверка авторизации на уровне приложения */
        this.objExpress.use(Middleware.AuthSysMiddleware);
        this.bUseAuthSys = true;

        return this;
    }

    /**
     * Использовать статические файлы
     * @param sPath 
     */
    public fUseStatic(sPath: string): App {
        this.objExpress.use(express.static(sPath));
        return this;
    }

    /**
     * ИСпользовать динамически шаблоны ejs
     * @param sPath 
     */
    public fUseViews(sPath: string): App {
        this.objExpress.set('views', sPath);
        this.objExpress.set('view engine', 'ejs');
        return this;
    }

    /**
     * Использовать дефолтный index page
     */
    public fUseDefaultIndex(): App {
        /* дефолтный index page */
        this.objExpress.use(IndexController.router);
        return this;
    }

    /**
     * Использовать файловый модуль
     */
    public fUseFileModule(): App {
        if(!this.conf.FileModule) {
            console.log('conf.sSaveFilePath is not use');
            process.exit(1);
        }
        this.objExpress.use(express.static(this.conf.FileModule.sUrl));
        this.objExpress.use(FileCtrl.router);
        return this;
    }

    /**
     * Установка приложения
     */
    public async faInstall(): Promise<App> {
        console.log('Start install app...');
        console.log('Start migrate DB...');

        if (!this.bUseMySql) {
            console.log('faInstall: MySql is not use');
            process.exit(1);
        };

        await this.objDb.migrate.latest();
        console.log('Migrate done!');

        console.log('Install app done!');

        return this;
    }

    /**
     * Создать миграцию
     * @param name: string - Название миграции
     */
    public async faMakeMigration(name: string): Promise<App> {
        if (!this.bUseMySql) throw 'MySql is not use';

        await this.objDb.migrate.make(name);
        return this;
    }

    /**
     * Выпольнить дефлтную миграцию
     */
    public async faRunDefaultMigration() {
        const migrator = new AppDefaultMigration(this.objDb);
        await migrator.faRun();
    }

    /**
     * Использовать AAClasses
     * его нудно переопределять есть используются extended AAClasses
     */
    public fUseAAClasses(): App {
        if (!this.bUseMySql) throw 'MySql is not use';
        /* модули доступа к данным */
        this.listDBData = {
            walletDB: new WalletModule.WalletDB(this.errorSys),
            fileDB: new FileModule.FileDB(this.errorSys),
        }

        this.listDB = new ListDB(this.listDBData);

        /* Подключаем конфиг */
        this.objExpress.use((req: System.MainRequest, resp: any, next: any) => {
            req.listDB = this.listDB;
            next();
        }); // уст. конфиг

        this.bUseAAClasses = true;


        return this;
    }



}




