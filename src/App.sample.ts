import { App } from './App';
import { ConfI } from './System/MainRequest';

let conf: ConfI;
const app = new App(conf)
    .fDisableCors() // отключаем cors
    .fUseBodyParser() // используем дефолтный BodyParser
    .fStart(); // Запускаем приложение
