
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
     public async searchRow(aidWord:number[], ixWordWeight:Record<number, number>, ixColumnWeight:Record<number, number>): Promise<{
        cnt_word: number; // Количество слова в строке
        sum_weight: number; // Сумма веса
        word: string; // Слово
        id_row: number; // ID строки
        id_word?: number; // ID слова
        column?:number; // колонка таблицы
        cnt?:number; // Количество совпадений в колонке
     }[]>{

        const sWordList = aidWord.join(',');
        console.log(ixWordWeight);

        const asIfWordWeight:string[] = [];
        let sQueryWordWeight = `VALUES `;
        _.forEach(ixWordWeight, (v,k) => { 
            asIfWordWeight.push(`ROW(${k},${v})`)
        })
        sQueryWordWeight += asIfWordWeight.join(',');
        console.log('word - weight:',sQueryWordWeight);

        const asColumnWeight:string[] = [];
        let sQueryColumnWeight = `VALUES `;
        _.forEach(ixColumnWeight, (v,k) => { 
            asColumnWeight.push(`ROW(${k},${v})`)
        })
        sQueryColumnWeight += asColumnWeight.join(',');
        console.log('column - weight:',sQueryColumnWeight);

        let resp = [];

        if(aidWord.length && _.size(ixWordWeight)){
            try{
                const sql = `
                    SELECT 
                        COUNT(*) cnt_word,
                        SUM( if(q4.id_column, q2.w * q4.w, q2.w) ) sum_weight, 
                        w.word, ix_t.*
                    FROM ix_tovar ix_t 
                    LEFT JOIN word w ON w.id = ix_t.id_word
                    LEFT JOIN (
                        SELECT * FROM (
                            ${sQueryWordWeight}
                        ) q1(id_word, w) 
                    ) q2 ON q2.id_word = ix_t.id_word
                    LEFT JOIN (
                        SELECT * FROM (
                            ${sQueryColumnWeight}
                        ) q3(id_column, w) 
                    ) q4 ON q4.id_column = ix_t.id_column
                    WHERE 
                        ix_t.id_word IN (${sWordList})
                    GROUP BY ix_t.id_row
                    ORDER BY cnt_word DESC, sum_weight DESC
                    LIMIT 10
                    ;
                `;

                console.log('sql find row>>>>',this.db.raw(sql).toString())

                resp = (await this.db.raw(sql))[0];

                console.log('>>>>',resp);

            } catch (e){
                this.errorSys.errorEx(e, 'IxSQL.list', 'Не удалось получить список');
            }
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
            this.errorSys.errorEx(e, 'IxSQL.packInsert', 'Не удалось записать индекс слов');
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

                    t.integer('id_row');
                    
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
