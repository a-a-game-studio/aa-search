
// Системные сервисы
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { ImgE, ImgI } from '../Entity/ImgE';

/**
 * Здесь методы для SQL запросов
 */
export class ImgSQL extends BaseSQL {

    constructor(req: MainRequest) {
        super(req);
    }



    /**
     * получит картинку по md5 файла
     * @param sToken
     */
    public async getImgByFileName(sFileName: string): Promise<ImgI> {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';

        // Декларация ошибок
        this.errorSys.declare([
            'get_Img'
        ]);

        sql = `
            SELECT
                *
            FROM ${ImgE.NAME} f
            WHERE f.file_name = :sFileName
            LIMIT 1
        `;

        try {
            resp = (await this.db.raw(sql, {
                'sFileName': sFileName
            }))[0][0];

        } catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'getImgByFileName', 'Не удалось получить sFileName');
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
    public async faInsert(data: ImgI): Promise<number> {

        let idImg: number;
        let imgE = new ImgE();

        try {


            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(imgE.getRulesInsert(), data)) {
                throw 'validation error';
            }

             idImg = (await this.db(ImgE.NAME)
                .insert(this.modelValidatorSys.getResult())
            )[0];



        } catch (e) {
            this.errorSys.error('insert_img', 'Ошибка добавления картинки');
        }

        return idImg;
    }


}
