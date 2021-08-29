
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { TableE, TableI } from '../Entity/TableE';
import _ from 'lodash';
import { LetterI } from '../Entity/LetterE';


/**
 * Здесь методы для SQL запросов
 */
export class TableSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // Проверить наличие слова в базе
    public async checkTable(sTable:string): Promise<boolean>{
        let oneTable = null;
        try{
            oneTable = await this.cacheSys.autoCache(`checkTable(${sTable})`, 3600, async () => {
                oneTable = (await this.db(TableE.NAME)
                    .where({name:sTable})
                    .limit(1)
                    .select()
                )[0];

                return oneTable;
            })
        } catch(e){
            this.errorSys.errorEx(e, 'TableSQL.checkTable', 'Не удалось получить список');
        }

        return oneTable ? true : false;
    }

    // Получить данные по слову в базе
    public async oneByName(sTable:string): Promise<TableI>{
        let oneTable = null;
        try{

            oneTable = await this.cacheSys.autoCache(`oneByName(${sTable})`, 3600, async () => {

                oneTable = (await this.db(TableE.NAME)
                    .where({name:sTable})
                    .limit(1)
                    .select()
                )[0]

                return oneTable;
            });
        } catch(e){
            this.errorSys.errorEx(e, 'TableSQL.oneByName', 'Не удалось получить список');
        }

        return oneTable;
    }


    


    /**
     * Получить список слов
     */
    public async listByTableList(asTableClean:string[]): Promise<TableI[]>{

        let listRowTable = null;

        try{
            listRowTable = (await this.db(TableE.NAME)
                .whereIn('table', asTableClean)
                .select()
            );

        } catch (e){
            this.errorSys.errorEx(e, 'TableSQL.list', 'Не удалось получить список');
        }
        

        return listRowTable;
    }

    /**
     * Получить список слов
     */
    public async insert(data:TableI): Promise<number>{

        const validData = this.logicSys.fValidData(TableE.getRulesInsert(), data)

        let idTable = 0;

        try{
            idTable = (await this.db(TableE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'TableSQL.list', 'Не удалось получить список');
        }

        return idTable;
    }

    

    

    /**
     * Получить список слов
     */
    public async update(idTable:number, data:TableI): Promise<number>{

        const validData = this.logicSys.fValidData(TableE.getRulesUpdate(), data)

        try{
            idTable = (await this.db(TableE.NAME)
                .where({id:idTable})
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'TableSQL.list', 'Не удалось получить список');
        }

        return idTable;
    }


    // Получить данные по слову в базе
    public async del(sTable:string): Promise<any>{
        let oneTable = null;
        try{

            (await this.db(TableE.NAME)
                .where({name:sTable})
                .del()
            )

        } catch(e){
            this.errorSys.errorEx(e, 'TableSQL.delTable', 'Не удалось удалить таблицу');
        }

        return oneTable;
    }

}
