
import * as Components from '@a-a-game-studio/aa-components/lib';



export namespace EngineR {

    // =======================================================
    /** Получить дерево типов */
    export namespace insert {

        /** APIURL */
        export const route = '/engine/insert';

        /** Параметры api запроса */
        export interface RequestI {
            table:string; // таблицы
            list_row:Object[]; // список строк
        }

        /** Параметры api ответа */
        export interface ResponseI {
            /** BIG TREE OBJECTS */
        }

    }

}