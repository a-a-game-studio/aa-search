
import *  as Components  from '@a-a-game-studio/aa-components/lib';

// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';


/**
 * Обертка над написание запросов Knex
 */
export class KnexSys {

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }

    /**
     * Получить строку из SQL raw запроса
     * @param data
     */
    fOneRaw(data:any): any{
        let ok = this.errorSys.isOk();
        let one = null;
        
        if(ok){ // Получаем стоку базы LIMIT 1
            try{ 
                one = data[0][0];
            } catch(e){
                throw this.errorSys.throwDB(e, 'faOneRaw');
            }
        }

        return one;
    }

    /**
     * Получить список из SQL raw запроса
     * @param data
     */
    async fListRaw(data:any): Promise<any>{
        let list = null;

        if(this.errorSys.isOk()){
            try{
                list = data[0];
            } catch(e){
                throw this.errorSys.throwDB(e, 'fListRaw');
            }
        }

        return list;
    }

    /**
     * Получить поле из SQL raw запроса
     * @param data
     * @param sField
     */
    fFieldRaw(sField:string, data:any): number|string|boolean|bigint{
        let ok = this.errorSys.isOk();
        let field = null;
        
        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                field = data[0][0][sField];
            } catch(e){
                throw this.errorSys.throwDB(e, 'fFieldRaw');
            }
        }

        return field;
    }

    // ==========================================

    /**
     * Получить строку из SQL builder запроса
     * @param data
     */
    async fOne(data:any): Promise<any>{
        let ok = this.errorSys.isOk();
        let one = null;
        
        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                one = data[0];
            } catch(e){
                throw this.errorSys.throwDB(e, 'fOne');
            }
        }

        return one;
    }

    /**
     * Получить строку из SQL builder запроса
     * @param data
     */
    async fList(data:any): Promise<any>{
        let list = null;

        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                list = data;
            } catch(e){
                throw this.errorSys.throwDB(e, 'fList');
            }
        }

        return list;
    }

    /**
     * Получить поле из SQL builder запроса
     * @param sField
     * @param data
     */
    async fField(sField:string, data:any): Promise<number|string|boolean|bigint>{
        let ok = this.errorSys.isOk();
        let field = null;
        
        if( this.errorSys.isOk() ){
            try{ // Получаем стоку базы LIMIT 1
                field = data[0][sField];
            } catch(e){
                throw this.errorSys.throwDB(e, 'fField');
            }
        }

        return field;
    }
}
