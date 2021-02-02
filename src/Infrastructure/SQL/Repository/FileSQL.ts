
// Системные сервисы
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { FileE, FileI } from '../Entity/FileE';

/**
 * Здесь методы для SQL запросов
 */
export class FileSQL extends BaseSQL {

    constructor(req: MainRequest) {
        super(req);
    }


    /**
     * Получить список пользователей
     *
     * @param integer iOffset
     * @param integer iLimit
     * @param array sSearchFIO
     * @return array|null
     */
    public async getFileList(iOffset: number, iLimit: number, aFilter: {
        search_Filename?: string; // Имя пользователя
    }): Promise<any> {
        let ok = this.errorSys.isOk();

        let sql = '';

        // Декларирование ошибок
        this.errorSys.declare([
            'get_File' // получение пользователей
        ]);

      
        let sSearchFileName = "";
        if (aFilter.search_Filename) {
            sSearchFileName = aFilter.search_Filename;
        }

        let bSearchFileName = false; // Использовать поиск по имени или нет
        if (sSearchFileName) {
            bSearchFileName = true;
        }

        let resp = null;
        if (ok) {
            sql = `
                SELECT
                   *
                FROM ${FileE.NAME} f
                WHERE
                    CASE WHEN :if_search_Filename THEN f.file_name LIKE :search_Filename ELSE true END
             
                ORDER BY f.id DESC
                LIMIT :limit
                OFFSET :offset
                ;
            `;

            try {
                resp = (await this.db.raw(sql, {
                    'offset': iOffset,
                    'limit': iLimit,
                    'if_search_Filename': bSearchFileName,
                }))[0];

            } catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'get_File', 'Не удалось получить file');
            }
        }

        return resp;
    }

    /**
     * Получить пользователя по ID
     *
     * @param integer idFile
     * @return array|null
     */
    public async getFileByID(idFile: number): Promise<any> {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';

        // Декларация ошибок
        this.errorSys.declare([
            'get_File'
        ]);

        sql = `
            SELECT
               *
            FROM ${FileE.NAME} f
            WHERE f.id = :id_File
            LIMIT 1
        `;

        try {
            resp = (await this.db.raw(sql, {
                'id_File': idFile
            }))[0][0];

        } catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'get_File', 'Не удалось получить file');
        }

        return resp;
    }


    /**
     * Получить идентификаторы пользователя по ID
     *
     * @param sToken
     */
    public async getFileByName(sFileName: string): Promise<FileI> {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';

        // Декларация ошибок
        this.errorSys.declare([
            'get_File'
        ]);

        sql = `
            SELECT
                *
            FROM ${FileE.NAME} f
            WHERE f.file_name = :sFileName
            LIMIT 1
        `;

        try {
            resp = (await this.db.raw(sql, {
                'sFileName': sFileName
            }))[0][0];

        } catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'getFileByName', 'Не удалось получить sFileName');
        }

        return resp;
    }

    // ========================================


    // =================================
    // INSERT
    // =================================

    /**
     * Вставка файла
     * @param data 
     */
    public async faInsert(data: FileI): Promise<number> {

        let idFile: number;
        let fileE = new FileE();

        try {


            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(fileE.getRulesInsert(), data)) {
                throw 'validation error';
            }

             idFile = (await this.db(FileE.NAME)
                .insert(this.modelValidatorSys.getResult())
            )[0];



        } catch (e) {
            this.errorSys.error('insert_file', 'Ошибка добавления файла');
        }

        return idFile;
    }


}
