import { BaseCtrl, MainRequest } from "../../Namespace/System";
const express = require('express');
const router = express.Router();
import { FileR as R } from './FileR'

import { FileM } from './Model/FileM';

/**
 * Контроллер 
 */
export class FileCtrl extends BaseCtrl {

    static sBaseUrl = '/file';

    public fileM: FileM;

    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    public async faInit() {
        
        // Инициализация бизнес моделей
        this.fileM = new FileM(this.req);

        //==================================================

        /*  Проверка авторизации */
        await this.userSys.isAuth();

        /*   Проверка права доступа на модуль */
        await this.userSys.isAccessCtrl('file-module');

        /*  Проверка являетесь ли вы администратором */
        this.userSys.isAdmin();

    }
}

router.post(R.uploadImg.route, async (req: MainRequest, res: any, next: any) => {
    const ctrl = new FileCtrl(req, res);
    await ctrl.faInit();
    await ctrl.faAction('Загрузить картинку в файловое хранилище', () => {
        return ctrl.fileM.addImg(req.body, req.conf.FileModule.sSavePath);
    })
});

export { router };
