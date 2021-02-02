
import *  as Components  from '@a-a-game-studio/aa-components/lib';

// Системные сервисы
import { RedisSys } from './RedisSys';
import { MainRequest } from './MainRequest';

import { UserSys } from './UserSys';
import { isObject, isArray } from 'util';
import { ModelValidatorSys, ModelRulesC } from '@a-a-game-studio/aa-components/lib';


/**
 * Система кеширования
 */
export class LogicSys {

    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;

    constructor(req: MainRequest) {

        this.errorSys = req.sys.errorSys;
        this.userSys = req.sys.userSys;
    }


    /**
     * Логический блок
     * @param sError - Сообщение об ощибке
     * @param callback - функция содержащая логическую операцию
     */
    async ifOk(sError:string, callback:Function):Promise<any>{

        let out = null;
        if( this.errorSys.isOk() ){
            try{
                out = await callback();
                this.errorSys.devNotice('ifok', sError);
            } catch(e) {
                throw this.errorSys.throw(e, sError)
            }
        } else {
            this.errorSys.devWarning('ifok', sError+' - Не выполненно');
        }
        
        return out;

    }

    /**
     * Блок для валидации входных данных
     * Выбрасывает ошибку в случае не правильности данных
     */
    fValidData<RequestT>(vModelRules:ModelRulesC, data:RequestT):RequestT{

		const validator = new ModelValidatorSys(this.errorSys);

		let validData:RequestT = null;
		if(validator.fValid(vModelRules.get(), data)){
			validData = validator.getResult();
		} else {	
			const e:Error = this.errorSys.throwValid('Ошибка входных данных');
			this.errorSys.errorEx(e, 'valid_data', 'Ошибка входных данных');
			throw e;
		}

		return validData;
    }

    /**
     * задержка на нужное кол-во секунд
     * @param n
     */
    faWait(n: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, n);
        });
    }


}
