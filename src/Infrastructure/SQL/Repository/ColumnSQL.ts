
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { ColumnE, ColumnI } from '../Entity/ColumnE';
import _ from 'lodash';
import { LetterI } from '../Entity/LetterE';

/**
 * Здесь методы для SQL запросов
 */
export class ColumnSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // Проверить наличие слова в базе
    public async checkColumn(sColumn:string): Promise<boolean>{
        let oneColumn = null;
        try{
            oneColumn = await this.cacheSys.autoCache(`fCheckColumn(${sColumn})`, 3600, async () => {
                oneColumn = (await this.db(ColumnE.NAME)
                    .where({column:sColumn})
                    .limit(1)
                    .select()
                )[0];

                return oneColumn;
            })
        } catch(e){
            console.log('!!!ERROR>fCheckColumn>', e);
        }

        return oneColumn ? true : false;
    }

    // Получить данные по слову в базе
    public async fOneColumn(sColumn:string): Promise<any>{
        let oneColumn = null;
        try{

            oneColumn = await this.cacheSys.autoCache(`fOneColumn(${sColumn})`, 3600, async () => {

                oneColumn = (await this.db(ColumnE.NAME)
                    .where({column:sColumn})
                    .limit(1)
                    .select()
                )[0]

                return oneColumn;
            });
        } catch(e){
            console.log('!!!ERROR>fOneColumn>', e);
        }

        return oneColumn;
    }


    


    /**
     * Получить список слов
     */
    public async listByColumnList(asColumnClean:string[]): Promise<ColumnI[]>{

        let listRowColumn = null;

        try{
            listRowColumn = (await this.db(ColumnE.NAME)
                .whereIn('column', asColumnClean)
                .select()
            );

        } catch (e){
            this.errorSys.errorEx(e, 'ColumnSQL.list', 'Не удалось получить список');
        }
        

        return listRowColumn;
    }

    /**
     * Получить список слов
     */
    public async insert(data:ColumnI): Promise<number>{

        const validData = this.logicSys.fValidData(ColumnE.getRulesInsert(), data)

        let idColumn = 0;

        try{
            idColumn = (await this.db(ColumnE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'ColumnSQL.insert', 'Не удалось получить список');
        }

        return idColumn;
    }

    

    

    /**
     * Получить список слов
     */
    public async update(data:ColumnI): Promise<number>{

        const validData = this.logicSys.fValidData(ColumnE.getRulesUpdate(), data)

        let idColumn = 0;

        try{
            idColumn = (await this.db(ColumnE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'ColumnSQL.update', 'Не удалось получить список');
        }

        return idColumn;
    }

    /**
     * Удалить колонки по таблице
     */
    public async delByTable(idTable:number): Promise<boolean>{

        let listRowColumn = null;

        try{
            listRowColumn = (await this.db(ColumnE.NAME)
                .where('id_table', idTable)
                .del()
            );

        } catch (e){
            this.errorSys.errorEx(e, 'ColumnSQL.delByTable', 'Не удалось удалить колонки');
        }
        
        return this.errorSys.isOk();
    }

}
