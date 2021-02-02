const crypto = require('crypto');
import { ImgS } from '../../../Service/ImgS';
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { FileSQL } from '../../../Infrastructure/SQL/Repository/FileSQL';

// Валидация
import { FileR as R } from '../FileR';
import { FileV as V } from '../FileV';

// Интерфейсы и сущьности
import { FileI } from '../../../Infrastructure/SQL/Entity/FileE';
import { ImgSQL } from '../../../Infrastructure/SQL/Repository/ImgSQL';
import { ImgI } from '../../../Infrastructure/SQL/Entity/ImgE';



export const fMd5 = (s: string): string => {
    return crypto.createHash('md5').update(s).digest("hex");;
}

/**
 * Файлы
 */
export class FileM extends BaseM {

    private fileSQL: FileSQL;
    private imgSql: ImgSQL;
    private imgS:ImgS;

    constructor(req: any) {
        super(req);

        this.fileSQL = new FileSQL(req);
        this.imgSql = new ImgSQL(req);

    }


    // =====================================

    /**
     * Добавить картику 
     */
    public async addImg(data: R.uploadImg.RequestI, sSaveFilePath: string): Promise<R.uploadImg.ResponseI> {

        const validData = this.logicSys.fValidData(V.saveImg(), data);

        const fileMd5 = fMd5(validData.fileBase64);

        const fileName = fileMd5 + '.jpg';

        const vFile = await this.imgSql.getImgByFileName(fileMd5);

        /* TODO: добавить обрезку */
        /* TODO: добавить растаскивание по папкам */

        if (!vFile) {

            let img: ImgI = {
                file_name: fileMd5, // имя файла md5 от исходника
                f_320: '', // x320
                f_800: '',
                f_1024: '',
            }

            /* Режем картинки */
            const file320 = await this.imgS.faResizeToBuffer(320, validData.fileBase64);
            const file800 = await this.imgS.faResizeToBuffer(800, validData.fileBase64);
            const file1024 = await this.imgS.faResizeToBuffer(1024, validData.fileBase64);

            /* получаем имена файлов */
            img.f_320 = fMd5(file320.toString('base64'));
            img.f_800 = fMd5(file800.toString('base64'));
            img.f_1024 = fMd5(file1024.toString('base64'));


            await this.imgS.faSaveBufferToFile(file320, sSaveFilePath + img.f_320 + '.jpg');
            await this.imgS.faSaveBufferToFile(file800, sSaveFilePath + img.f_800 + '.jpg');
            await this.imgS.faSaveBufferToFile(file1024, sSaveFilePath + img.f_1024 + '.jpg');

            /* вставляем файлы */
            await this.fileSQL.faInsert({
                file_name: img.f_320,
            });

            await this.fileSQL.faInsert({
                file_name: img.f_800,
            });

            await this.fileSQL.faInsert({
                file_name: img.f_1024,
            });

            /* вставляем картинку */
            await this.imgSql.faInsert(img);

        }

        // Формирование ответа
        let out: R.uploadImg.ResponseI = null;
        if(this.errorSys.isOk()){
            out = {
                file_name: fileMd5,
            };
        }
        return out;
    }
}
