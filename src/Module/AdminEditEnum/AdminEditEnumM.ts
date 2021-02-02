
// Системные классы
import BaseM from '../../System/BaseM';

// Классы SQL Запросов
import { EnumParamSQL } from '../../Infrastructure/SQL/Repository/EnumParamSQL';

// Routing
import {AdminEditEnumR} from './AdminEditEnumR';
import R = AdminEditEnumR;

import * as V from './AdminEditEnumV';

// Интерфейсы и сущьности
import { EnumParamI } from '../../Infrastructure/SQL/Entity/EnumParamE';
import { EnumSQL } from '../../Infrastructure/SQL/Repository/EnumSQL';
import { EnumI } from '../../Infrastructure/SQL/Entity/EnumE';
import { EnumSys } from '../../System/EnumSys';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class AdminEditEnumM extends BaseM
{

    private enumParamSQL: EnumParamSQL;
    private enumSQL: EnumSQL;
    private enumSys: EnumSys;

    constructor(req:any) {
        super(req);

        this.enumParamSQL = new EnumParamSQL(req);
        this.enumSQL = new EnumSQL(req);
        this.enumSys = new EnumSys(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async init(data:R.init.RequestI): Promise<R.init.ResponseI> {

        data = <R.init.RequestI>V.init(this.req, data);    

        let aEnumList:EnumI[] = null;
        await this.logicSys.ifOk('Получить список enum', async () => {
            aEnumList = await this.enumSQL.listAllEnum();
        });

        let out:R.init.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                is_init:true,
                list_enum:aEnumList // Список всех enum
            };
        });

        return out;
    }

    /**
     * Получить дерево объектов
     * @param data 
     */
    public async getEnumTreeType(data:R.getEnumTreeType.RequestI): Promise<R.getEnumTreeType.ResponseI> {

        data = <R.getEnumTreeType.RequestI>V.getEnumTreeType(this.req, data);

        let vEnumTreeType:any = null;
        await this.logicSys.ifOk('Получить дерево объектов', async () => {
            vEnumTreeType = await this.enumSys.faGetEnumType();
        });

        let out:R.getEnumTreeType.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = vEnumTreeType;
        });

        return out;
    }

    /**
     * Выбрать enumу
     * @param array data
     */
    public async selectEnum(data:R.selectEnum.RequestI): Promise<R.selectEnum.ResponseI> {

        data = <R.selectEnum.RequestI>V.selectEnum(this.req, data);

        let idEnum = data.id_enum;

        let vEnum:EnumI = null;
        await this.logicSys.ifOk('Получить информацию по enum', async () => {
            vEnum = await this.enumSQL.oneEnumByID(idEnum);
        });

        let aEnumParam:EnumParamI[] = null;
        await this.logicSys.ifOk('Получить список параметров enum', async () => {
            aEnumParam = await this.enumParamSQL.listByParam({
                id_enum:idEnum
            });
        });

        let out:R.selectEnum.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum:vEnum,
                list_enum_param:aEnumParam
            };
        });

        return out;
    }

    // =======================================

    /**
     * Выбрать параметр enum
     * @param array data
     */
    public async selectEnumParam(data:R.selectEnumParam.RequestI): Promise<R.selectEnumParam.ResponseI> {

        data = <R.selectEnumParam.RequestI>V.selectEnumParam(this.req, data);

        let idEnumParam = data.id_enum_param;

        let oneEnumParam:EnumParamI = null;
        await this.logicSys.ifOk('Получить список ролей пользователя', async () => {
            oneEnumParam = await this.enumParamSQL.oneEnumParamByID(idEnumParam);
        });

        let out:R.selectEnumParam.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum_param:oneEnumParam
            }
        });

        return out;
    }

 

    /**
     * Удалить enum параметр
     * @param data
     */
    public async delEnumParam(data:R.delEnumParam.RequestI): Promise<R.delEnumParam.ResponseI> {

        data = <R.delEnumParam.RequestI>V.delEnumParam(this.req, data);

        let idEnumParam = data.id_enum_param;
        let idEnum = data.id_enum;

        let bDelEnumParam = false;
        await this.logicSys.ifOk('Удалить enum параметр', async () => {
            bDelEnumParam = await this.enumParamSQL.delEnumParamByID(idEnumParam);
        });

        let aEnumParams:EnumParamI[] = null;
        await this.logicSys.ifOk('Список enum параметров', async () => {
            aEnumParams = await this.enumParamSQL.listByParam({
                id_enum:idEnum
            });
        });

        let out:R.delEnumParam.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                del_enum_param_from_enum:bDelEnumParam,
                list_enum_param:aEnumParams
            };
        });

        return out;
    }

    /**
     * Добавить enum
     * @param data 
     */
    public async addEnum(data:R.addEnum.RequestI): Promise<R.addEnum.ResponseI> {

        data = <R.addEnum.RequestI>V.addEnum(this.req, data);

        let idEnum:number = null;
        await this.logicSys.ifOk('Добавить enum', async () => {
            idEnum = await this.enumSQL.addEnum(data);
        });

        let listEnum:EnumI[] = null;
        await this.logicSys.ifOk('Получить список enum', async () => {
            listEnum = await this.enumSQL.listAllEnum();
        });

        let vEnum:EnumI = null;
        await this.logicSys.ifOk('Получить информацию по enum', async () => {
            vEnum = await this.enumSQL.oneEnumByID(idEnum);
        });

        let out:R.addEnum.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                id_enum:idEnum, // ID enum
                one_enum:vEnum, // Информация по enum
                list_enum:listEnum // Список пользователей
            };
        });

        return out;
    }

    /**
     * Сохранить enumу
     * @param data данные
     */
    public async saveEnum(data:R.saveEnum.RequestI): Promise<R.saveEnum.ResponseI> {

        data = <R.saveEnum.RequestI>V.saveEnum(this.req, data);

        let idEnum = data.id_enum;

        let bSaveEnum = false;
        await this.logicSys.ifOk('Сохранить enum', async () => {
            bSaveEnum = await this.enumSQL.saveEnum(idEnum, data);
        });

        let vEnum:EnumI = null;
        await this.logicSys.ifOk('Получить информацию по enum', async () => {
            vEnum = await this.enumSQL.oneEnumByID(idEnum);
        });

        let listEnum:EnumI[] = null;
        await this.logicSys.ifOk('Получить список enum', async () => {
            listEnum = await this.enumSQL.listAllEnum();
        });

        let out:R.saveEnum.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum:vEnum, // Измененный пользователь
                list_enum:listEnum // Список пользователей
            };
        });

        return out;
    }

    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    public async saveEnumParam(data:R.saveEnumParam.RequestI): Promise<R.saveEnumParam.ResponseI> {

        data = <R.saveEnumParam.RequestI>V.saveEnumParam(this.req, data);

        let idEnumParam = data.id_enum_param;

        let bSaveEnumParam = false;
        await this.logicSys.ifOk('Сохранить enum параметр', async () => {
            bSaveEnumParam = await this.enumParamSQL.saveEnumParam(idEnumParam, data);
        });

        let vEnumParam:EnumParamI = null;
        await this.logicSys.ifOk('Получить информацию по enum параметру', async () => {
            vEnumParam = await this.enumParamSQL.oneEnumParamByID(idEnumParam);
        });

        let listEnumParam:EnumI[] = null;
        await this.logicSys.ifOk('Получить список enum параметры', async () => {
            listEnumParam = await this.enumParamSQL.listByParam({
                id_enum:vEnumParam.id_enum
            });
        });

        let out:R.saveEnumParam.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum_param:vEnumParam, // Измененный пользователь
                list_enum_param:listEnumParam // Список пользователей
            };
        });

        return out;
    }

    /**
     * Удалить enum
     * @param data 
     */
    public async delEnum(data:R.delEnum.RequestI): Promise<R.delEnum.ResponseI> {

        data = <R.delEnum.RequestI>V.delEnum(this.req, data);

        let idEnum = data.id_enum;

        let bDelEnum = false;
        await this.logicSys.ifOk('Удалить enum', async () => {
            bDelEnum = await this.enumSQL.delEnumByID(idEnum);
        });

        let listEnum:EnumI[] = null;
        await this.logicSys.ifOk('Получить обновленный список enum', async () => {
            listEnum = await this.enumSQL.listAllEnum();
        });

        let out:R.delEnum.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                del_enum:bDelEnum, // Подтверждение регистрации
                list_enum:listEnum // Список пользователей
            };
        });

        return out;
    }

    /**
     * Добавить enumу параметр
     * @param data 
     */
    public async addEnumParam(data:R.addEnumParam.RequestI): Promise<R.addEnumParam.ResponseI> {

        data = <R.addEnumParam.RequestI>V.addEnumParam(this.req, data);

        let idEnum = data.id_enum;

        let idGEnumParam:number = null;
        await this.logicSys.ifOk('Добавить enum параметр', async () => {
            idGEnumParam = await this.enumParamSQL.addEnumParam(data);
        });

        let aEnumParam:EnumParamI[] = null;
        await this.logicSys.ifOk('Список enum параметров', async () => {
            aEnumParam = await this.enumParamSQL.listByParam({
                id_enum:idEnum
            });
        });

        let vEnumParam:EnumParamI = null;
        await this.logicSys.ifOk('Получить информацию по enum параметру', async () => {
            vEnumParam = await this.enumParamSQL.oneEnumParamByID(idGEnumParam);
        });

        let out:R.addEnumParam.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                id_enum_param:idGEnumParam, 
                one_enum_param:vEnumParam,
                list_enum_param:aEnumParam // Список контроллеров
            };
        });

        return out;
    }

}
