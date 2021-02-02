
/** Модуль для загрузки файлов */
export namespace FileR{

    // =======================================================
    /** Загрузить картинку в файловое хранилище */
    export namespace uploadImg {

        /** APIURL */
        export const route = '/file/upload-img';

        /** Alias действия */
        export const action = 'upload-img';


        /** Параметры api запроса */
        export interface RequestI {
            fileBase64: string; // файл для загрузки
        }

        /** Параметры api ответа */
        export interface ResponseI {
            file_name: string; // md5 содержимого
        }
    }
}
