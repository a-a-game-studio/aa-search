
import * as Components from '@a-a-game-studio/aa-components/lib';

import { EnumI } from '../../Infrastructure/SQL/Entity/EnumE';
import { EnumParamI } from '../../Infrastructure/SQL/Entity/EnumParamE';


export namespace AdminEditEnumR {

    // =======================================================
    /** Получить дерево типов */
    export namespace getEnumTreeType {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/get-enum-tree-type';

        /** Alias действия */
        export const action = 'get-enum-tree-type';

        /** Параметры api запроса */
        export interface RequestI {
        }

        /** Параметры api ответа */
        export interface ResponseI {
            /** BIG TREE OBJECTS */
        }

    }


    // =======================================================
    /** Получить Список пользователей */
    export namespace init {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/init';

        /** Alias действия */
        export const action = 'init';

        /** Параметры api запроса */
        export interface RequestI {
        }

        /** Параметры api ответа */
        export interface ResponseI {
            is_init:boolean; // Статус инициализации
            list_enum: EnumI[]; // Список enum
        }
    }


    // =======================================================
    /** Выбрать enumу */
    export namespace selectEnum {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/select-enum';

        /** Alias действия */
        export const action = 'select-enum';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum: number; // ID пользователя
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_enum: EnumI; // Информация о enumе
            list_enum_param: EnumParamI[]; // Список всех доступов enumе
        }
    }

    // =======================================================
    /** Выбрать enumу */
    export namespace selectEnumParam {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/select-enum-param';

        /** Alias действия */
        export const action = 'select-enum-param';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum_param: number; // ID контроллера доступа
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_enum_param: EnumParamI; // Информация о контроллере доступа
        }
    }


    // =======================================================
    /** Удалить пользователя из enumы */
    export namespace delEnumParam {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/del-enum-param';

        /** Alias действия */
        export const action = 'del-enum-param';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum_param: number; // ID контроллера доступа
            id_enum: number; // ID enumы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            del_enum_param_from_enum: boolean; // Статус операции
            list_enum_param: EnumParamI[]; // Список всех enum в которых состоит пользователь
        }

    }

    // =======================================================
    /** Добавить enumу пользователей */
    export namespace addEnum {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/add-enum';

        /** Alias действия */
        export const action = 'add-enum';

        /** Параметры api запроса */
        export interface RequestI {
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id_enum:number; // ID enum
            one_enum:EnumI; // Данные новой enumы
            list_enum:EnumI[]; // Вернуть обновленный список enum
        }

    }

    // =======================================================
    /** Добавить enumу контроллер доступа*/
    export namespace addEnumParam {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/add-enum-param';

        /** Alias действия */
        export const action = 'add-enum-param';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum: number; // ID ENUM которому добавляем параметр
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id_enum_param:number; // Добавить контроллер доступа
            one_enum_param:EnumParamI; // Данные нового контроллера
            list_enum_param:EnumParamI[]; // Вернуть обновленный список контроллеров
        }

    }

    // =======================================================
    /** Удалить enumу */
    export namespace delEnum {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/del-enum';

        /** Alias действия */
        export const action = 'del-enum';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum: number; // ID Группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            del_enum: boolean; // Статус операции
            list_enum:EnumI[]; // список enum
        }

    }

    /** Сохранить данные о enumу */
    export namespace saveEnum {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/save-enum';

        /** Alias действия */
        export const action = 'save-enum';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum:number; // ID enumы
            alias:string; // Псевдоним enumы
            name:string; // Наименование enumы
            descript:string; // Описание enumы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_enum: EnumI; // информация по enumе
            list_enum: EnumI[]; // Список enum
        }

    }

    /** Сохранить контроллер доступа */
    export namespace saveEnumParam {

        /** APIURL */
        export const route = '/aa/admin-edit-enum/save-enum-param';

        /** Alias действия */
        export const action = 'save-enum-param';

        /** Параметры api запроса */
        export interface RequestI {
            id_enum_param:number; // ID параметра
            k?: string; // Ключ
            name?: string; // Имя
            val?: number; // Значение
            descript?: string; // Описание 
            type?: string; // Тип
            arg1?: string; // Аргумент 1
            arg2?: string; // Аргумент 2
            arg3?: string; // Аргумент 3
        };

        /** Параметры api ответа */
        export interface ResponseI {
            one_enum_param: EnumParamI; // информация по контроллеру
            list_enum_param: EnumParamI[]; // Список контроллеров
        }

    }
}