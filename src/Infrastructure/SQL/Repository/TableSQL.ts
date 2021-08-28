
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
            oneTable = await this.cacheSys.autoCache(`fCheckTable(${sTable})`, 3600, async () => {
                oneTable = (await this.db(TableE.NAME)
                    .where({table:sTable})
                    .limit(1)
                    .select()
                )[0];

                return oneTable;
            })
        } catch(e){
            console.log('!!!ERROR>fCheckTable>', e);
        }

        return oneTable ? true : false;
    }

    // Получить данные по слову в базе
    public async oneByName(sTable:string): Promise<any>{
        let oneTable = null;
        try{

            oneTable = await this.cacheSys.autoCache(`fOneTable(${sTable})`, 3600, async () => {

                oneTable = (await this.db(TableE.NAME)
                    .where({table:sTable})
                    .limit(1)
                    .select()
                )[0]

                return oneTable;
            });
        } catch(e){
            console.log('!!!ERROR>fOneTable>', e);
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
