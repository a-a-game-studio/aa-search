

import { UserI } from '../../Infrastructure/SQL/Entity/UserE';
import { GroupI } from '../../Infrastructure/SQL/Entity/GroupE';
import { UserGroupI } from '../../Infrastructure/SQL/Entity/UserGroupE';

/** Модуль редактирования пользователей */
export namespace AdminEditUserR{

    // =======================================================
    /** Получить Список пользователей */
    export namespace init {

        /** APIURL */
        export const route = '/aa/admin-edit-user/init';

        /** Alias действия */
        export const action = 'init';

        /** Параметры api запроса */
        export interface RequestI {
            offset: number; // С какой записи получать данные
            limit: number; // Сколько записей получать
            search_surname?: string; // Поиск По Фамилии пользователя
            search_username?: string; // Поиск по Имени пользователя
        }

        /** Параметры api ответа */
        export interface ResponseI {
            is_init:boolean; // Является ли пользователь администратором
            count_user: number; // Количество пользователей
            list_user: UserI[]; // Список пользователей
            list_group: GroupI[]; // Список всех групп
        }
    }


    // =======================================================
    /** Выбрать пользователя */
    export namespace selectUser {

        /** APIURL */
        export const route = '/aa/admin-edit-user/select-user';

        /** Alias действия */
        export const action = 'select-user';

        /** Параметры api запроса */
        export interface RequestI {
            id_user: number; // ID пользователя
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_user: UserI; // Информация о пользователе
            list_user_group: UserGroupI[]; // Список всех групп в которых состоит пользователь
        }

    }

    // =======================================================
    /** Выбрать группу */
    export namespace selectGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-user/select-group';

        /** Alias действия */
        export const action = 'select-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_group: number; // ID Группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            one_group: GroupI; // Информация о группе
        }
    }


    // =======================================================
    /** Добавить пользователя к группе */
    export namespace addUserToGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-user/add-user-to-group';

        /** Alias действия */
        export const action = 'add-user-to-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_user: number; // ID пользователя
            id_group: number; // ID группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            add_user_to_group: number; // ID Связи пользователя и группы
            list_user_group: UserGroupI[]; // Список всех групп в которых состоит пользователь
        }

    }


    // =======================================================
    /** Удалить пользователя из группы */
    export namespace delUserFromGroup {

        /** APIURL */
        export const route = '/aa/admin-edit-user/del-user-from-group';

        /** Alias действия */
        export const action = 'del-user-from-group';

        /** Параметры api запроса */
        export interface RequestI {
            id_user: number; // ID пользователя
            id_group: number; // ID группы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            del_user_from_group: boolean; // Статус операции
            list_user_group: UserGroupI[]; // Список всех групп в которых состоит пользователь
        }
    }

    /** Добавить пользователя */
    export namespace addUser {

        /** APIURL */
        export const route = '/aa/admin-edit-user/add-user';

        /** Alias действия */
        export const action = 'add-user';

        /** Параметры api запроса */
        export interface RequestI {
            login:string; // Псевдоним пользователя
            name?:string; // Имя пользователя не обызательный параметр
            pswd:string; // Пароль
        }

        /** Параметры api ответа */
        export interface ResponseI {
            add_user:number; // ID Нового пользователя
            one_user:UserI; // Данные нового пользователя
            list_user:UserI[]; // Вернуть обновленный список пользователей
        }
    }

    // =======================================================
    /** Удалить пользователя */
    export namespace delUser {

        /** APIURL */
        export const route = '/aa/admin-edit-user/del-user';

        /** Alias действия */
        export const action = 'del-user';

        /** Параметры api запроса */
        export interface RequestI {
            id_user: number; // ID пользователя
        }

        /** Параметры api ответа */
        export interface ResponseI {
            del_user: boolean; // Статус операции
            list_user:UserI[]; // список пользователей
        }
    }

    /** Сохранить данные о пользователе */
    export namespace saveUser {

        /** APIURL */
        export const route = '/aa/admin-edit-user/save-user';

        /** Alias действия */
        export const action = 'save-user';

        /** Параметры api запроса */
        export interface RequestI {
            id_user:number; // email
            name?:string; // Пароль
            surname?:string; // Фамилия
            patronymic?:string; // Отчество
            email?:string; // Изменить email
        }

        /** Параметры api ответа */
        export interface ResponseI {
            save_user:boolean; // команда сохранения пользователя
            one_user: UserI; // пользователь
            list_user: UserI[]; // 
        }

    }
}