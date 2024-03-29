
import * as Components from '@a-a-game-studio/aa-components/lib';
import { ColumnT } from '../../Infrastructure/SQL/Entity/ColumnE';



export namespace EngineR {

    // =======================================================
    /** Получить дерево типов */
    export namespace createTable {

        /** APIURL */
        export const route = '/engine/create-table';

        /** Параметры api запроса */
        export interface RequestI {
            table:string; // таблицы
            list_column:{
                name:string;
                type: 'bool' | 'int' | 'str' | 'text' | 'date' | 'datetime' | 'time' | 'decimal';

            }[]; // список строк
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id_table: number;
        }

    }

    // =======================================================
    /** Получить дерево типов */
    export namespace delTable {

        /** APIURL */
        export const route = '/engine/del-table';

        /** Параметры api запроса */
        export interface RequestI {
            table:string; // таблицы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            // Нет ответа
        }

    }

    // =======================================================
    /** Получить дерево типов */
    export namespace clearTable {

        /** APIURL */
        export const route = '/engine/clear-table';

        /** Параметры api запроса */
        export interface RequestI {
            table:string; // таблицы
        }

        /** Параметры api ответа */
        export interface ResponseI {
            // Нет ответа
        }

    }

    // =======================================================
    /** Получить дерево типов */
    export namespace insert {

        /** APIURL */
        export const route = '/engine/insert';

        /** Параметры api запроса */
        export interface RequestI {
            table:string; // таблицы
            list_row:any[]; // список строк
        }

        /** Параметры api ответа */
        export interface ResponseI {
            /** BIG TREE OBJECTS */
        }

    }

    // =======================================================
    /** поиск */
    export namespace search {

        /** APIURL */
        export const route = '/engine/search';

        /** Параметры api запроса */
        export interface RequestI {
            table:string; // таблицы
            search:string; // тестовый поиск
            where?:string; // Доп Условия
            limit?:number; // Колчиество строк
            page?:number; // Страница
            ix_column_weight?:Record<string, number> // Вес колонки
            exact_word_weight?:number // Вес колонки
        }

        /** Параметры api ответа */
        export interface ResponseI {
            list_row:any[]; // список строк
        }

    }

}