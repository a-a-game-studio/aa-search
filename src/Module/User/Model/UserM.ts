
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { UserSQL } from '../../../Infrastructure/SQL/Repository/WordSQL';
import { UserTokenSQL } from '../../../Infrastructure/SQL/Repository/UserTokenSQL';
import { UserSMSCodeSQL } from '../../../Infrastructure/SQL/Repository/UserSMSCodeSQL';
import { UserGroupSQL } from '../../../Infrastructure/SQL/Repository/UserGroupSQL';

// Валидация
import * as V from '../Validator/UserV';

// Интерфейсы и сущьности
import { UserI } from '../../../Infrastructure/SQL/Entity/WordE';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class UserM extends BaseM
{

    private userSQL: UserSQL;
    private userSMSCode: UserSMSCodeSQL;
    private userTokenSQL: UserTokenSQL;
    private userGroupSQL: UserGroupSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.userTokenSQL = new UserTokenSQL(req);
        this.userSMSCode = new UserSMSCodeSQL(req);
        this.userGroupSQL = new UserGroupSQL(req);
    }

    public async getSelfUserInfo(data:V.getSelfUserInfo.RequestI): Promise<V.getSelfUserInfo.ResponseI> {

        data = <V.getSelfUserInfo.RequestI>V.getSelfUserInfo.valid(this.req, data);    

        let ok = this.errorSys.isOk();

        let idUser:number = this.userSys.getIdUser();

        // --------------------------

        let vUser = null;
        if(ok){ // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoById(idUser);
        }
        console.log(vUser);

        // --------------------------

        let out:V.getSelfUserInfo.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_user_info:vUser, // Список пользователей
            };
        }

        return out;
    }

    public async getUserInfo(data:V.getUserInfo.RequestI): Promise<V.getUserInfo.ResponseI> {

        data = <V.getUserInfo.RequestI>V.getUserInfo.valid(this.req, data);    

        let ok = this.errorSys.isOk();

        let idUser:number = data.id_user;

        // --------------------------

        let vUser = null;
        if(ok){ // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoById(idUser);
            if(!vUser){
                this.errorSys.error('get_user_by_token', 'Не удалось получить пользователя по токену');
            }
        }

        // --------------------------

        let out:V.getUserInfo.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_user_info:vUser, // Список пользователей
            };
        }

        return out;
    }

    // =====================================

    /**
     * Сохранить
     * @param data 
     */
    public async save(data:V.save.RequestI): Promise<V.save.ResponseI> {

        data = <V.save.RequestI>V.save.valid(this.req, data);    

        let ok = this.errorSys.isOk();

        let idUser:number = data.id_user;

        // --------------------------

        let bSave = false;
        if(ok){ // Сохранить данных о пользователе
            bSave = await this.userSQL.faUpdate(idUser, data);
        }

        // --------------------------

        let vUser = null;
        if(ok){ // Получить пользователя по ID
            vUser = await this.userSQL.getUserByID(idUser);
            if(!vUser){
                this.errorSys.error('get_user_by_token', 'Не удалось получить пользователя по токену');
            }
        }

        // --------------------------

        let out:V.save.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                save_user:bSave,
                one_user:vUser // Список пользователей
            };
        }

        return out;
    }
}
