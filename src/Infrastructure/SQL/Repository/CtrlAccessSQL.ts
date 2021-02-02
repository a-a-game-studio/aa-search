
// Глобальные сервисы

// Системные сервисы
import { MainRequest } from '../../../System/MainRequest';

// Сущьности и правила валидации
import {CtrlAccessE, CtrlAccessI} from '../Entity/CtrlAccessE';
import BaseSQL from '../../../System/BaseSQL';

/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
export class CtrlAccessSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // ========================================
    // SELECT
    // ========================================

    /**
     * Получить контроллер доступа по Alias
     *
     * @param string aliasCtrlAccess
     * @return array|null
     */
    public async getCtrlAccessByAlias(aliasCtrlAccess:string): Promise<any>{
        let ok = this.errorSys.isOk();
        
        let sql = '';

        // Декларация ошибок
        this.errorSys.declare([
            'get_ctrl_access',
            'get_ctrl_access_not_found'
        ]);

        sql = `
            SELECT
                ca.id,
                ca.alias,
                ca.name,
                ca.descript
            FROM ${CtrlAccessE.NAME} ca
            WHERE ca.alias = :alias
            LIMIT 1
        `;

        let respCtrlAccess:any = null;
        if(ok){
            try{
                respCtrlAccess = (await this.db.raw(sql, {
                    'alias': aliasCtrlAccess
                }))[0][0];

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'get_ctrl_access', 'Не удалось получить контроль доступа');
            }
        }


        return respCtrlAccess;
    }

    /**
     * Получить контроллер доступа по ID
     *
     * @param integer idCtrlAccess
     * @return array|null
     */
    public async getCtrlAccessByID(idCtrlAccess:number): Promise<CtrlAccessI>{
        let ok = this.errorSys.isOk();
        let resp:any = null;

        // Декларация ошибок
        this.errorSys.declare([
            'get_ctrl_access',
            'ctrl_access_not_found'
        ]);

        let sql = `
            SELECT
                ca.id,
                ca.alias,
                ca.name,
                ca.descript
            FROM ${CtrlAccessE.NAME} ca
            WHERE ca.id = :id_ctrl_access
            LIMIT 1
        `;

        try{
            resp = (await this.db.raw(sql, {
                'id_ctrl_access': idCtrlAccess
            }))[0];

        } catch (e){
            ok = false;
            this.errorSys.error('get_ctrl_access', 'Не удалось получить контроль доступа');
        }


        if ( ok && resp.length > 0) {
            resp = resp[0];
        } else {
            resp = null;
            ok = false;
            this.errorSys.error('ctrl_access_not_found', 'Контроллер доступа не найден');
        }
        return resp;
    }


    /**
     * Получить список контроллеров доступа
     *
     * @return array|null
     */
    public async getAllCtrlAccess(): Promise<any>{
        let ok = this.errorSys.isOk();
        let bCache = false; // Наличие кеша
        let sql = '';
        let resp:any = null;

        // Декларация ошибок
        this.errorSys.declare([
            'get_list_ctrl_access'
        ]);


        let ctrlAccessList = null;
        if( ok ){ // Получаем весь список контроллеров доступа

            ctrlAccessList = await this.cacheSys.autoCache("CtrlAccessSQL.getAllCtrlAccess()", 3600, async () => {

                let ctrlAccessList = null;
                sql = `
                    SELECT
                        ca.id,
                        ca.alias,
                        ca.name
                    FROM ${CtrlAccessE.NAME} ca
                    ;
                `;

                try{
                    ctrlAccessList = (await this.db.raw(sql))[0];
                } catch (e){
                    ok = false;
                    this.errorSys.error('get_list_ctrl_access', 'Не удалось получить группы пользователя');
                }

                return ctrlAccessList;
            }); // autoCache
        }

        // Формирование ответа
        return ctrlAccessList;
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Сохранить контроллер доступа
     *
     * @param integer idCtrlAccess
     * @return boolean
     */
    public async saveCtrlAccess(idCtrlAccess:number, data:{ [key: string]: any }): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'db_save_ctrl_access'
        ]);

        console.log('===>data:',data);

        let vCtrlAccessE = new CtrlAccessE();
        if( ok && this.modelValidatorSys.fValid(vCtrlAccessE.getRulesUpdate(), data) ){

            let resp = null;
            try{

                console.log('===>result:',this.modelValidatorSys.getResult());
                resp = await this.db(CtrlAccessE.NAME)
                    .where({
                        id: idCtrlAccess
                    })
                    .update(this.modelValidatorSys.getResult());

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'db_save_ctrl_access', 'Не удалось сохранить изменения в контроллере доступа');
            }

        }

        if( ok ){
            await this.cacheSys.clearCache('CtrlAccessSQL*');
        }

        return ok;
    }

    // ========================================
    // INSERT
    // ========================================

    /**
     * Добавить контроль доступа
     *
     * @return boolean
     */
    public async addCtrlAccess(data:CtrlAccessI): Promise<number>{
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'add_ctrl_access'
        ]);

        let vCtrlAccessE = new CtrlAccessE();
        let idCtrlAccess = 0;
        if( ok && this.modelValidatorSys.fValid(vCtrlAccessE.getRulesInsert(), data) ){

            try{
                idCtrlAccess = (await this.db(CtrlAccessE.NAME)
                    .insert(this.modelValidatorSys.getResult())
                )[0];

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'add_ctrl_access', 'Не удалось добавить контроль доступа');
            }

        }

        if( ok ){ // Удалить связанный кеш
            this.cacheSys.clearCache('CtrlAccessSQL*');
        }

        return idCtrlAccess;
    }

    // ========================================
    // DELETE
    // ========================================


    /**
     * удалить контроллер доступа по ID
     *
     * @param string aliasCtrlAccess
     * @return boolean
     */
    public async delCtrlAccessByAlias(aliasCtrlAccess:string): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
      /*   this.errorSys.declareEx({
            'del_ctrl_access':'Не удалось удалить контроллер доступа'
        }); */

        if( ok ){
            try{
                await this.db(CtrlAccessE.NAME)
                    .where({
                        alias: aliasCtrlAccess,
                    })
                    .limit(1)
                    .del()
                ;

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'del_ctrl_access', 'Не удалось удалить контроллер доступа');
            }
        }

        if( ok ){ // Удаляем связный кеш
            this.cacheSys.clearCache('CtrlAccessSQL*');
        }

        return ok;
    }

    // ========================================
    // COUNT
    // ========================================

    /**
     * Проверить наличия контроллера доступа по ALIAS
     * Alias униакльное поле потому LIMIT 1
     *
     * @param string aliasCtrlAccess
     * @return integer
     */
    public async cntCtrlAccessByAlias(aliasCtrlAccess:string): Promise<number>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'cnt_ctrl_access'
        ]);

        let resp = null;
        let cntCtrlAccess = 0;

        if( ok ){ // Получить количество контроллеров доступа
            let sql = `
                SELECT
                    COUNT(*) cnt
                FROM ${CtrlAccessE.NAME} ca
                WHERE ca.alias = :alias
                LIMIT 1
            `;

            try{
                resp = (await this.db.raw(sql, {
                    'alias': aliasCtrlAccess
                }))[0];

                cntCtrlAccess = Number(resp[0]['cnt']);
            } catch (e){
                ok = false;
                this.errorSys.error('cnt_ctrl_access', 'Не удалось подсчитать контроль доступа');
            }
        }

        if( ok ){ // Ответ
            return cntCtrlAccess;
        } else {
            return -1; // В случае если произошла SQL ошибка
        }

    }

}
