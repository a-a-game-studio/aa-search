
// Системные классы
import BaseM from '../../System/BaseM';

// Классы SQL Запросов
import { UserSQL } from '../../Infrastructure/SQL/Repository/UserSQL';

// Роутинг
import {LoginR} from './LoginR';
import R = LoginR

// Валидация
import * as V from './LoginV'

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class LoginM extends BaseM
{

    private userSQL: UserSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
    }

    public async init(data:R.init.RequestI): Promise<R.init.ResponseI> {

        data = <R.init.RequestI>V.init(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser:number = this.userSys.getIdUser();

        // --------------------------

        let vUser = null;
        if(ok){ // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoById(idUser);
        }
        console.log(vUser);

        // --------------------------

        let out:R.init.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                is_login: this.userSys.ifAuth(),
                one_user_info:vUser, // Список пользователей
                id_user:vUser.id_user
            };
        }

        return out;
    }

    public async login(data:R.login.RequestI): Promise<R.login.ResponseI> {

        data = <R.login.RequestI>V.login(this.req, data);    

        let ok = this.errorSys.isOk();

        let sLogin = data.login;
        let sPswd = data.pswd;

        // --------------------------

        let sToken:string = null;
        if(ok){ // Получить токен по логину и паролю
            sToken = await this.userSQL.faGetTokenByLoginAndPass(sLogin, sPswd);
            if(!sToken){
                this.errorSys.error('get_token', 'Не удалось получить токен');
            }
        }

        // --------------------------

        let vUser = null;
        if(ok){ // Получить пользователя по токену
            vUser = await this.userSQL.fGetUserInfoByToken(sToken);
            if(!vUser){
                this.errorSys.error('get_user_by_token', 'Не удалось получить пользователя по токену');
            }
        }

        // --------------------------

        let out:R.login.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                is_login: true, // Статус авторизирован пользователь или нет
                one_user:vUser, // Список пользователей
                token:sToken // Токен
            };
        }

        return out;
    }

    // =========================================

    public async register(data:R.register.RequestI): Promise<R.register.ResponseI> {

        data = <R.register.RequestI>V.register(this.req, data);

        let ok = this.errorSys.isOk();

        // --------------------------

        let sToken:string = null;
        if(ok){ // регистрируем пользователя
            sToken = await this.userSQL.faRegister(data);
            if(!sToken){
                this.errorSys.error('get_token', 'Не удалось получить токен');
            }
        }

        // --------------------------

        let out:R.register.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                token:sToken // Токен
            };
        }

        return out;
    }

    // =====================================
}
