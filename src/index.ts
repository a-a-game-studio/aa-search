// Подключене системных файлов для экспорта
import * as Controller from './Namespace/Controller'

// Подключене системных файлов для экспорта
import * as System from './Namespace/System'

// Подключене системных файлов
import * as Middleware from './Namespace/Middleware'

// Подключене SQL запросов
import * as SQL from './Namespace/SQL'

// Подключение компонентной библиотеки
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import * as SeoModule from "./System/Seo";

import { App } from "./App";
import { AppDefaultMigration } from './AppDefaultMigration';


export {
    Controller,
    SQL,
    System,
    AAClasses, // Общие компоненты
    Middleware,
    SeoModule,
    App, // готовое собранно приложение
    AppDefaultMigration,
}
