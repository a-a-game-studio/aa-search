
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../Namespace/System';
import { GroupI } from '../../Infrastructure/SQL/Entity/GroupE';
import { System } from '../../';
import { UserGroupI } from '../../Infrastructure/SQL/Entity/UserGroupE';
import { CtrlAccessI } from '../../Infrastructure/SQL/Entity/CtrlAccessE';
import { AccessGroupI } from '../../Infrastructure/SQL/Entity/AccessGroupE';

export namespace AdminEditGroupR {

    // =======================================================
    /** Получить Список пользователей */
    export namespace init {

        /** APIURL */
        export const route = '/aa/admin-edit-group/init';

        /** Alias действия */
        export const action = 'init';

        /** Параметры api запроса */
        export interface RequestI {
        }

        /** Параметры api ответа */
        export interface ResponseI {
            is_init:boolean; // Статус инициализации
            list_group: GroupI[]; // Список групп
            list_ctrl_access:CtrlAccessI[]; // Все доступные модули
        }
    }


    // =======================================================
    /** Выбрать группу */
    export namespace selectGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-group/select-group';

        /** Alias действия */
        export const action = 'select-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_group: number; // ID пользователя
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_group: UserI; // Информация о группе
            list_access_group: UserGroupI[]; // Список всех доступов группе
        }
    }

    // =======================================================
    /** Выбрать группу */
    export namespace selectCtrlAccess {

        /** APIURL */
        export const route = '/aa/admin-edit-group/select-ctrl-access';

        /** Alias действия */
        export const action = 'select-ctrl-access';

        /** Параметры api запроса */
        export interface RequestI {
            id_ctrl_access: number; // ID контроллера доступа
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_ctrl_access: CtrlAccessI; // Информация о контроллере доступа
        }
    }


    // =======================================================
    /** Добавить права группе на контроллер */
    export namespace addCtrlAccessToGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-group/add-ctrl-access-to-group';

        /** Alias действия */
        export const action = 'add-ctrl-access-to-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_ctrl_access: number; // ID контроллера доступа
            id_group: number; // ID группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            add_ctrl_access_to_group: number; // ID Связи пользователя и группы
            list_access_group: AccessGroupI[]; // Список всех групп в которых состоит пользователь
        }

    }


    // =======================================================
    /** Удалить пользователя из группы */
    export namespace delCtrlAccessFromGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-group/del-ctrl-access-from-group';

        /** Alias действия */
        export const action = 'del-ctrl-access-from-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_ctrl_access: number; // ID контроллера доступа
            id_group: number; // ID группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            del_ctrl_access_from_group: boolean; // Статус операции
            list_access_group: AccessGroupI[]; // Список всех групп в которых состоит пользователь
        }

    }

    // =======================================================
    /** Добавить группу пользователей */
    export namespace addGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-group/add-group';

        /** Alias действия */
        export const action = 'add-group';

        /** Параметры api запроса */
        export interface RequestI {
            alias:string; // Псевдоним группы
            name:string; // Наименование группы
            group:string; // Группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            add_group:number; // Добавить группу
            one_group:GroupI; // Данные новой группы
            list_group:GroupI[]; // Вернуть обновленный список групп
        }

    }

    // =======================================================
    /** Добавить группу контроллер доступа*/
    export namespace addCtrlAccess {

        /** APIURL */
        export const route = '/aa/admin-edit-group/add-ctrl-access';

        /** Alias действия */
        export const action = 'add-ctrl-access';

        /** Параметры api запроса */
        export interface RequestI {
            alias:string; // Псевдоним группы
            name:string; // Наименование группы
            group:string; // Группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            add_ctrl_access:number; // Добавить контроллер доступа
            one_ctrl_access:CtrlAccessI; // Данные нового контроллера
            list_ctrl_access:CtrlAccessI[]; // Вернуть обновленный список контроллеров
        }

    }

    // =======================================================
    /** Удалить группу */
    export namespace delGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-group/del-group';

        /** Alias действия */
        export const action = 'del-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_group: number; // ID Группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            del_group: boolean; // Статус операции
            list_group:GroupI[]; // список групп
        }

    }

    /** Сохранить данные о группу */
    export namespace saveGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-group/save-group';

        /** Alias действия */
        export const action = 'save-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_group:number; // ID группы
            alias:string; // Псевдоним группы
            name:string; // Наименование группы
            descript:string; // Описание группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            save_group:boolean; // команда сохранения группы
            one_group: GroupI; // информация по группе
            list_group: GroupI[]; // Список групп
        }

    }

    /** Сохранить контроллер доступа */
    export namespace saveCtrlAccess {

        /** APIURL */
        export const route = '/aa/admin-edit-group/save-ctrl-access';

        /** Alias действия */
        export const action = 'save-ctrl-access';

        /** Параметры api запроса */
        export interface RequestI {
            id_ctrl_access:number; // ID группы
            alias:string; // Псевдоним группы
            name:string; // Наименование группы
            descript:string; // Описание группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            save_ctrl_access:boolean; // команда сохранения контроллера
            one_ctrl_access: CtrlAccessI; // информация по контроллеру
            list_ctrl_access: CtrlAccessI[]; // Список контроллеров
        }

    }
}