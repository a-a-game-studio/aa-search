
// Библиотеки
const utf8 = require('utf8');
const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');

// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { UserE } from '../Entity/UserE';
import { UserTokenE } from '../Entity/UserTokenE';
import { UserSmsCodeE } from '../Entity/UserSmsCodeE';


/**
 * Здесь методы для SQL запросов
 */
export class UserTokenSQL extends BaseSQL
{


    // ==========================
    // SELECT
    // ==========================

    /**
     * проверка на то что есть apikey в базе
     */
    public async isAuth(apikey:string = ''): Promise<boolean>{

        let bResp = false;
        let sql = '';
        let ok = true;
        let resp:any[] = null;

        /* если ключ больше 4 */
        if( apikey.length > 4) {

            if ( await this.redisSys.get('is_auth_' + apikey)  ) {
                bResp = true;
                this.errorSys.devNotice(`cache:UserSQL.isAuth(${apikey})`, 'Взято из кеша');
            } else {
                //Получаем одного пользователя
                sql = `
                    SELECT 
                        ut.token
                    FROM ${UserTokenE.NAME} ut
                    WHERE 
                        ut.token= :token 
                    ORDER BY ut.token DESC
                    LIMIT 1;
                `;
                
                try{
                    resp = (await this.db.raw(sql, {
                        'token': apikey
                    }))[0];


                    if (resp.length > 0) {
                        bResp = true;
                        this.redisSys.set('is_auth_' + apikey, 1, 3600);
                    }

                } catch (e){
                    ok = false;
                    this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
                }

            }

        }

        return bResp;
    }

    /**
     * Выдает apikey по id_user
     */
    public async getUserApiKey(id_user:number):Promise<string>{

        let ok = true;
        let resp:any[] = null;

        // Декларация ошибок
        this.errorSys.declare([
            'api_key_in_db'
        ]);

        let token:string = null;
		if( ok ){ /* выбираем последний из вставленных */
            let sql = `
                SELECT 
                    ut.* 
                FROM ${UserTokenE.NAME} ut
                WHERE 
                    ut.id_user = :id_user
                ORDER BY ut.id_user_token DESC
                LIMIT 1
                ;
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'id_user': id_user,
                }))[0];

                if (resp.length > 0) {
                    token = resp[0]['token'];
                } else {
                    token = null;
                }

            } catch (e){
                ok = false;
                this.errorSys.error('api_key_in_db', 'Не удалось проверить apikey');
            }
        }

        return token;

    }

    // ==========================
    // INSERT
    // ==========================

    /**
     * вставляет ключ для юзера
     * ничего не проверяет только вставляет 
     * @param id_user 
     */
    public async insertUserApiKey(id_user:number): Promise<string>{
        let ok = true;
        let apikey = uniqid(uuidv4()+'-')

        // Декларация ошибок
      /*   this.errorSys.declareEx({
            'db_inser_key_for_user':'Не удалось вставить ключ пользователя'
        }); */

        let idUserToken = 0;
        try{
            idUserToken = await this.db('user_token').insert({
                api_key: apikey,
                id_user: id_user,
            });

        } catch (e){
            ok = false;
            this.errorSys.error('inser_key_for_user', 'Не удалось вставить ключ пользователя');
        }

        if ( ok ) {
            return apikey;
        } else {
            return null;
        }

    }

}
