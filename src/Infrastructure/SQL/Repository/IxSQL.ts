
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { IxE, IxI } from '../Entity/IxE';
import _ from 'lodash';
import { ColumnT } from '../Entity/ColumnE';


/**
 * Здесь методы для SQL запросов
 */
export class IxSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список слов
     */
    public async list(): Promise<IxI[]>{

        let resp = null;

        try{
            resp = (await this.db(IxE.NAME)
                .select()
                .limit(30)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.list', 'Не удалось получить список');
        }
        

        return resp;
    }

    /**
     * Получить список слов
     */
    public async insert(data:IxI): Promise<number>{

        const validData = this.logicSys.fValidData(IxE.getRulesInsert(), data);

        let idIx = 0;
        try{
            idIx = (await this.db(IxE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.insert', 'Не удалось получить список');
        }

        return idIx;
    }

    /**
     * Получить список слов
     */
    public async packInsert(sTable:string, aIxWord:IxI[]): Promise<number> {

        let idIx = 0;

        try{
            const aaIxWordChunk = _.chunk(aIxWord, 1000);
            for (let i = 0; i < aaIxWordChunk.length; i++) {
                const aIxWordChunk = aaIxWordChunk[i];
                (await this.db(IxE.NAME + sTable)
                    .insert(aIxWordChunk)
                );
            }

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.packInsert', 'Не удалось получить список');
        }

        return idIx;
    }


    /**
     * Получить список слов
     */
    public async update(data:IxI): Promise<number>{

        const validData = this.logicSys.fValidData(IxE.getRulesUpdate(), data)

        let idIx = 0;

        try{
            idIx = (await this.db(IxE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.update', 'Не удалось получить список');
        }

        return idIx;
    }

    /**
     * Удалить таблицу индексов
     */
    public async dropTable(sTable:string): Promise<boolean>{

        let listRowColumn = null;
        try{
            const isExistTable = await this.db.schema.hasTable(IxE.NAME+sTable);
            if( isExistTable ){
                listRowColumn = (await this.db.schema
                    .dropTable(IxE.NAME+sTable)
                );
            } else {
                this.errorSys.warning('IxSQL.dropTable', sTable+' - Таблица не существует');
            }

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.dropTable', 'Не удалось удалить таблицу');
        }
        
        return this.errorSys.isOk();
    }


    /**
     * Очистить таблицу индексов
     */
     public async truncateTable(sTable:string): Promise<boolean>{

        let listRowColumn = null;
        try{
            listRowColumn = (await this.db(IxE.NAME+sTable)
                .truncate()
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.truncateTable', 'Не удалось очистить таблицу');
        }
        
        return this.errorSys.isOk();
    }

    /**
     * Очистить таблицу индексов
     */
     public async createTable(sTable:string): Promise<boolean>{

        let listRowColumn = null;
        try{
            const isExistTable = await this.db.schema.hasTable(IxE.NAME+sTable);
            if( !isExistTable ){
                listRowColumn = (await this.db.schema.createTable(IxE.NAME+sTable, (t)=>{
                    t.bigIncrements();
                    
                    t.integer('id_column');

                    t.integer('id_word');

                    t.integer('cnt');
                }));
            } else {
                this.errorSys.warning('IxSQL.createTable', sTable+' - Таблица уже существует');
            }

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.createTable', 'Не удалось очистить таблицу');
        }
        
        return this.errorSys.isOk();
    }

}
