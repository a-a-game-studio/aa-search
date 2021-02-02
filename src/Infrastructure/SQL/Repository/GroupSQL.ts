
// Глобальные сервисы
import * as redisSys  from '../../../System/RedisSys';

// Системные сервисы

import { MainRequest } from '../../../System/MainRequest';

// Сущьности и правила валидации
import {GroupE, GroupI} from '../Entity/GroupE';
import BaseSQL from '../../../System/BaseSQL';

/**
 * Здесь методы для SQL запросов
 * - Группы пользователей
 */
export class GroupSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // ========================================
    // SELECT
    // ========================================

    /**
     * Получить группу по ID
     * @param integer idGroup
     */
    public async getGroupByID(idGroup:number): Promise<GroupI>{

        let oneGroup = null;
        await this.logicSys.ifOk('Получить группу', async () => {
            let sql = `
                SELECT
                    g.id,
                    g.alias,
                    g.name,
                    g.descript
                FROM ${GroupE.NAME} g
                WHERE g.id = :id_group
                LIMIT 1
            `;

            oneGroup = this.knexSys.fOneRaw(
                await this.db.raw(sql, {
                    id_group: idGroup
                })
            );
        });

        return oneGroup;
    }

    /**
     * Получить группы/роли
     *
     * @return array|null
     */
    public async getAllGroups(): Promise<any>{
        let ok = this.errorSys.isOk();

        let bCache = false; // Наличие кеша
        let sql:string = '';
        let resp = null;

        // Декларация ошибок
        this.errorSys.declare([
            'get_roles'
        ]);

        let groupList = null;
        if( ok && !bCache ){ // Получаем весь список групп
            groupList = await this.cacheSys.autoCache(`GroupSQL.getAllGroups()`, 3600, async () => {

                let groupList = null;
                sql = `
                    SELECT
                        g.id,
                        g.name,
                        g.alias
                    FROM ${GroupE.NAME} g
                    ;
                `;

                try{
                    groupList = (await this.db.raw(sql))[0];
                } catch (e){
                    ok = false;
                    this.errorSys.error('get_roles', 'Не удалось получить группы пользователя');
                }

                return groupList;
        
            }); // autoCache
        }


        // Формирование ответа
        return groupList;
    }

    // ========================================
    // INSERT
    // ========================================

    /**
     * Добавить группу
     *
     * @return boolean
     */
    public async addGroup(data:GroupI): Promise<number>{
        let ok = this.errorSys.isOk();
        // Декларация ошибок
        this.errorSys.declare([
            'add_group'
        ]);

        let vGroupE = new GroupE();
        let idGroup = 0;
        if( ok && this.modelValidatorSys.fValid(vGroupE.getRulesInsert(), data) ){

            try{
                idGroup = (await this.db(GroupE.NAME)
                    .insert(this.modelValidatorSys.getResult())
                )[0];

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'add_group', 'Не удалось добавить группу');
            }

        }

        if( ok ){ // Удалить связанный кеш
            this.cacheSys.clearCache('GroupSQL*');
        }

        return idGroup;
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Сохранить группу по ID
     *
     * @param integer idGroup
     * @return boolean
     */
    public async saveGroup(idGroup:number, data:GroupI): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
        this.errorSys.declare([
            'save_group'
        ]);

        let vGroupE = new GroupE();
        if( ok && this.modelValidatorSys.fValid(vGroupE.getRulesUpdate(), data) ){

            let resp = null;
            try{
                resp = await this.db(GroupE.NAME)
                    .where({
                        id: idGroup
                    })
                    .update(this.modelValidatorSys.getResult())

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'save_group', 'Не удалось сохранить изменения в группе');
            }
        }

        let aRelatedKeyRedis = [];
        if( ok ){ // Удалить связанный кеш
            aRelatedKeyRedis = await this.redisSys.keys('GroupSQL*');
            this.redisSys.del(aRelatedKeyRedis);
        }

        return ok;
    }

    // ========================================
    // DELETE
    // ========================================


    /**
     * удалить группу по ID
     *
     * @param string aliasCtrlAccess
     * @return boolean
     */
    public async delGroupByID(idGroup:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        // Декларация ошибок
       /*  this.errorSys.declareEx({
            'del_group':'Не удалось удалить группу'
        });
 */
        if( ok ){
            try{
                await this.db(GroupE.NAME)
                    .where({
                        id: idGroup,
                    })
                    .limit(1)
                    .del()
                ;

            } catch (e){
                ok = false;
                this.errorSys.errorEx(e, 'del_group', 'Не удалось удалить группу');
            }
        }

        if( ok ){ // Удаляем связный кеш
            this.cacheSys.clearCache('GroupSQL*');
        }

        return ok;
    }
}
