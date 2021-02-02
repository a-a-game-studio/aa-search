


// Системные сервисы
import BaseSQL from '../../../System/BaseSQL';


// Сущьности и правила валидации
import {EnumE, EnumI} from '../Entity/EnumE';
import { EnumParamE } from '../Entity/EnumParamE';

/**
 * Здесь методы для SQL запросов
 * enum
 */
export class EnumSQL extends BaseSQL
{

    // ========================================
    // SELECT
    // ========================================

    /**
     * Получить enum по ID
     *
     * @param idEnum
     */
    public async oneEnumByID(idEnum:number): Promise<any>{
        let ok = this.errorSys.isOk();
        
        let respEnum = null;
        await this.logicSys.ifOk('Получить enum по ID', async () => {
            let sql = `
                SELECT
                    e.*
                FROM ${EnumE.NAME} e
                WHERE e.id = :id_enum
                LIMIT 1
            `;
            
            respEnum = this.knexSys.fOneRaw(
                await this.db.raw(sql, {
                    id_enum: idEnum
                })
            );
        });

        return respEnum;
    }

    /**
     * Получить все enumы
     */
    public async listAllEnum(): Promise<EnumI[]>{
        let ok = this.errorSys.isOk();

        let listEnum = null;
        if( ok ){ // Получить список
            let sql = `
                SELECT
                    e.*
                FROM ${EnumE.NAME} e
                ORDER BY id DESC
                ;
            `;

            try{
                listEnum = (await this.db.raw(sql))[0];
            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось получить список enumов');
            }
        }
        console.log('listAllEnum');

        // Формирование ответа
        return listEnum;
    }

    // ========================================
    // INSERT
    // ========================================

    /**
     * Добавить enum
     *
     * @return boolean
     */
    public async addEnum(data:EnumI): Promise<number>{
        let ok = this.errorSys.isOk();

        let vEnumE = new EnumE();
        let idEnum = 0;
        if( ok && this.modelValidatorSys.fValid(vEnumE.getRulesInsert(), data) ){

            try{
                idEnum = (await this.db(EnumE.NAME)
                    .insert({})
                )[0];

                (await this.db(EnumE.NAME)
                    .where({
                        id:idEnum
                    })
                    .update({
                        k:'enum_'+idEnum,
                        name:'enum #'+idEnum
                    })
                );

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось добавить enum');
            }

        }

        return idEnum;
    }

    // ========================================
    // UPDATE
    // ========================================

    /**
     * Сохранить enum по ID
     *
     * @param integer idEnum
     * @return boolean
     */
    public async saveEnum(idEnum:number, data:EnumI): Promise<boolean>{
        let ok = this.errorSys.isOk();

        let vEnumE = new EnumE();
        if( ok && this.modelValidatorSys.fValid(vEnumE.getRulesUpdate(), data) ){

            console.log('idEnum:',idEnum);
            console.log(this.modelValidatorSys.getResult());

            let resp = null;
            try{
                resp = await this.db(EnumE.NAME)
                    .where({
                        id: idEnum
                    })
                    .update(this.modelValidatorSys.getResult())

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось сохранить изменения в enumе');
            }
        }

        return ok;
    }

    // ========================================
    // DELETE
    // ========================================

    /**
     * удалить enum по ID
     *
     * @param string kCtrlAccess
     * @return boolean
     */
    public async delEnumByID(idEnum:number): Promise<boolean>{
        let ok = this.errorSys.isOk();

        if( ok ){
            try{
                await this.db(EnumParamE.NAME)
                    .where({
                        id_enum: idEnum,
                    })
                    .del()
                ;

                await this.db(EnumE.NAME)
                    .where({
                        id: idEnum,
                    })
                    .limit(1)
                    .del()
                ;

            } catch (e){
                throw this.errorSys.throw(e, 'Не удалось удалить enum');
            }
        }

        return ok;
    }
}
