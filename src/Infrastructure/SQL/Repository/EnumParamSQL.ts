


// Системные сервисы
import BaseSQL from '../../../System/BaseSQL';


// Сущьности и правила валидации
import {EnumParamE, EnumParamI} from '../Entity/EnumParamE';

/**
 * Здесь методы для SQL запросов
 * параметр enum
 */
export class EnumParamSQL extends BaseSQL
{

    // ========================================
    // SELECT
    // ========================================

    /**
     * Получить параметр enum по ID
     *
     * @param idEnumParam
     */
    public async oneEnumParamByID(idEnumParam:number): Promise<any>{
        let ok = this.errorSys.isOk();
        
        let respEnumParam = null;
        if( ok ){ // Получить список
            let sql = `
                SELECT
                    ep.*
                FROM ${EnumParamE.NAME} ep
                WHERE ep.id = :id_enum_param
                LIMIT 1
            `;
            
            try{
                respEnumParam = (await this.db.raw(sql, {
                    id_enum_param: idEnumParam
                }))[0][0];

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось получить запись о параметр enumе');
            }
        }

        return respEnumParam;
    }

    /**
     * Получить все параметр enumы
     */
    public async listAllEnumParam(): Promise<any>{
        let ok = this.errorSys.isOk();

        let listEnumParam = null;
        if( ok ){ // Получить список
            let sql = `
                SELECT
                    ep.*
                FROM ${EnumParamE.NAME} ep
                ORDER BY id DESC
                ;
            `;

            try{
                listEnumParam = (await this.db.raw(sql))[0];
            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось получить список параметр enumов');
            }
        }

        // Формирование ответа
        return listEnumParam;
    }

    /**
     * Получить все параметр enumы
     */
    public async listByParam(data:{
        id_enum:number
    }): Promise<EnumParamI[]>{
        let ok = this.errorSys.isOk();

        let listEnumParam = null;
        if( ok ){ // Получить список
            let sql = `
                SELECT
                    ep.*
                FROM ${EnumParamE.NAME} ep
                WHERE
                    ep.id_enum = :id_enum
                ORDER BY id DESC
                ;
            `;

            try{
                listEnumParam = (await this.db.raw(sql,{
                    id_enum: data.id_enum
                }))[0];
            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось получить список параметр enumов');
            }
        }

        // Формирование ответа
        return listEnumParam;
    }
    

    // ========================================
    // INSERT
    // ========================================

    /**
     * Добавить группу
     *
     * @return boolean
     */
    public async addEnumParam(data:EnumParamI): Promise<number>{
        let ok = this.errorSys.isOk();

        let vEnumParamE = new EnumParamE();
        let idEnumParam = 0;
        if( ok && this.modelValidatorSys.fValid(vEnumParamE.getRulesInsert(), data) ){

            try{
                idEnumParam = (await this.db(EnumParamE.NAME)
                    .insert({})
                )[0];

                let iUpdated = (await this.db(EnumParamE.NAME)
                    .where({
                        id:idEnumParam
                    })
                    .update({
                        k: 'enum_param_' + idEnumParam,
                        name: 'enum param #' + idEnumParam,
                        id_enum: data.id_enum,
                        val: idEnumParam
                    })
                )[0];

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось добавить параметр enum');
            }

        }

        return idEnumParam;
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Сохранить группу по ID
     *
     * @param integer idEnumParam
     * @return boolean
     */
    public async saveEnumParam(idEnumParam:number, data:EnumParamI): Promise<boolean>{
        let ok = this.errorSys.isOk();

        let vEnumParamE = new EnumParamE();
        if( ok && this.modelValidatorSys.fValid(vEnumParamE.getRulesUpdate(), data) ){

            let resp = null;
            try{
                resp = await this.db(EnumParamE.NAME)
                    .where({
                        id: idEnumParam
                    })
                    .update(this.modelValidatorSys.getResult())

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось сохранить изменения в параметр enumе');
            }
        }

        return ok;
    }

    // ========================================
    // DELETE
    // ========================================

    /**
     * удалить группу по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    public async delEnumParamByID(idEnumParam:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        console.log('idEnumParam:',idEnumParam);

        if( ok ){
            try{
                await this.db(EnumParamE.NAME)
                    .where({
                        id: idEnumParam,
                    })
                    .limit(1)
                    .del()
                ;

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось удалить параметр enum');
            }
        }

        return ok;
    }

    /**
     * удалить группу по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    public async delAllEnumParamOfEnum(idEnum:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        if( ok ){
            try{
                await this.db(EnumParamE.NAME)
                    .where({
                        id_enum: idEnum,
                    })
                    .limit(1)
                    .del()
                ;

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось удалить параметр enum');
            }
        }

        return ok;
    }

    
}
