
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { SourceE, SourceI } from '../Entity/SourceE';
import _ from 'lodash';
import { ColumnT } from '../Entity/ColumnE';
import { IxE } from '../Entity/IxE';

/**
 * Здесь методы для SQL запросов
 */
export class SourceSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список слов
     */
    public async list(sTable:string, aidRow:number[]): Promise<SourceI[]>{

        let resp = null;

        try{
            resp = (await this.db(SourceE.NAME+sTable)
                .whereIn('id',aidRow)
                .select()
            );

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.list', 'Не удалось получить список');
        }
        

        return resp;
    }

    /**
     * Получить список слов
     */
    public async insert(data:SourceI): Promise<number>{

        const validData = this.logicSys.fValidData(SourceE.getRulesInsert(), data)

        let idSource = 0;

        try{
            idSource = (await this.db(SourceE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.list', 'Не удалось получить список');
        }

        return idSource;
    }

    /**
     * Получить список слов
     */
     public async packInsert(sTable:string, aIxWord:SourceI[]): Promise<number> {

        let idIx = 0;

        try{
            const aaIxWordChunk = _.chunk(aIxWord, 1000);
            for (let i = 0; i < aaIxWordChunk.length; i++) {
                const aIxWordChunk = aaIxWordChunk[i];
                (await this.db(SourceE.NAME + sTable)
                    .insert(aIxWordChunk)
                );
            }

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.packInsert', 'Не удалось записать исходники строк');
        }

        return idIx;
    }


    /**
     * Получить список слов
     */
    public async update(data:SourceI): Promise<number>{

        const validData = this.logicSys.fValidData(SourceE.getRulesUpdate(), data)

        let idSource = 0;

        try{
            idSource = (await this.db(SourceE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.list', 'Не удалось получить список');
        }

        return idSource;
    }

    /**
     * Удалить таблицу индексов
     */
     public async dropTable(sTable:string): Promise<boolean>{

        try{
            const isExistTable = await this.db.schema.hasTable(SourceE.NAME+sTable);
            if( isExistTable ){

                (await this.db.schema
                    .dropTable(SourceE.NAME+sTable)
                );
            } else {
                this.errorSys.warning('SourceSQL.dropTable', sTable+' - Таблица не существует');
            }


        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.dropTable', 'Не удалось удалить таблицу');
        }
        
        return this.errorSys.isOk();
    }

    /**
     * Очистить таблицу индексов
     */
     public async truncateTable(sTable:string): Promise<boolean>{

        let listRowColumn = null;
        try{
            listRowColumn = (await this.db(SourceE.NAME+sTable)
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
     public async createTable(sTable:string, aColumn:{name:string;type:ColumnT}[]): Promise<boolean>{

        let listRowColumn = null;
        try{
            const isExistTable = await this.db.schema.hasTable(SourceE.NAME+sTable);
            if( !isExistTable ){

                listRowColumn = (await this.db.schema.createTable(SourceE.NAME+sTable, (t)=>{
                    t.bigIncrements();
                    
                    for (let i = 0; i < aColumn.length; i++) {
                        const vColumn = aColumn[i];
            
                        if(vColumn.type == ColumnT.bool){
                            t.boolean(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.date){
                            t.date(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.datetime){
                            t.dateTime(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.decimal){
                            t.decimal(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.int){
                            t.integer(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.json){
                            t.json(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.str){
                            t.string(vColumn.name, 100);
                        }

                        if(vColumn.type == ColumnT.text){
                            t.text(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.time){
                            t.time(vColumn.name);
                        }

                        if(vColumn.type == ColumnT.uid){
                            t.uuid(vColumn.name);
                        }
                    }
                }));
            } else {
                this.errorSys.warning('SourceSQL.createTable', sTable+' - Таблица уже существует');
            }

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.createTable', 'Не удалось создать таблицу');
        }
        
        return this.errorSys.isOk();
    }

}
