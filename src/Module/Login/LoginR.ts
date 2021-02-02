

import { UserI } from '../../Infrastructure/SQL/Entity/UserE';

/** Модуль логина/авторизации */
export namespace LoginR {
    // =======================================================
    /** Начальные данные */
    export namespace init {

        /** APIURL */
        export const route = '/aa/login/init';

        /** Alias действия */
        export const action = 'init';

        /** Параметры api запроса */
        export interface RequestI {
        }

        /** Параметры api ответа */
        export interface ResponseI {
            is_login:boolean;
            one_user_info: UserI; // пользователь
            id_user:number;
        }
    }

    // =======================================================
    /** Залогиниться */
    export namespace login {

        /** APIURL */
        export const route = '/aa/login/login';

        /** Alias действия */
        export const action = 'login';

        /** Параметры api запроса */
        export interface RequestI {
            login:string; // Псевдоним пользователя
            pswd:string; // Пароль
        }

        /** Параметры api ответа */
        export interface ResponseI {
            is_login: boolean; // Статус авторизирован пользователь или нет
            one_user: UserI; // пользователь
            token:string; // Токен
        }

    }

    // =======================================================
    /** Зарегистрироваться */
    export namespace register {

        /** APIURL */
        export const route = '/aa/login/register';

        /** Alias действия */
        export const action = 'register';

        /** Параметры api запроса */
        export interface RequestI {
            login:string; // Псевдоним пользователя
            name?:string; // Имя пользователя не обызательный параметр
            email:string; // email
            pswd:string; // Пароль
        }

        /** Параметры api ответа */
        export interface ResponseI {
            token:string; // Токен
        }

    }
}

