
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { WordSQL } from '../../../Infrastructure/SQL/Repository/WordSQL';

// Routing
import {EngineR as R} from '../EngineR';


import { EngineV as V } from '../EngineV';
import { SourceSQL } from '../../../Infrastructure/SQL/Repository/SourceSQL';
import _ from 'lodash';
import { EngineS } from '../../../Service/EngineS';
import { ColumnT } from '../../../Infrastructure/SQL/Entity/ColumnE';
import { ColumnSQL } from '../../../Infrastructure/SQL/Repository/ColumnSQL';
import { TableSQL } from '../../../Infrastructure/SQL/Repository/TableSQL';

// Интерфейсы и сущьности

const confIndex:Record<string, number> = {
    'name':1,
    'sostav':2,
    'description':3,
    'ostatok':4
}

const confIndexType:Record<string, string> = {
    'name':'string',
    'sostav':'text',
    'description':'text',
    'ostatok':'text'
}


/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class InsertM extends BaseM
{

    private wordSQL: WordSQL;
    private sourceSQL: SourceSQL;
    private engineS: EngineS = null;
    private columnSQL: ColumnSQL = null;
    private tableSQL: TableSQL = null;

    constructor(req:any) {
        super(req);

        this.wordSQL = new WordSQL(req);
        this.sourceSQL = new SourceSQL(req);
        this.engineS = new EngineS(req);
        this.columnSQL = new ColumnSQL(req);
        this.tableSQL = new TableSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async insert(data:R.insert.RequestI): Promise<R.insert.ResponseI> {

        const validData = this.logicSys.fValidData(V.insert(), data);

        let aRowData:any[] = [];
        const vTable = await this.tableSQL.oneByName(validData.table);

        const aColumn = await this.columnSQL.listByTable(vTable.id);

        const ixColumn = _.keyBy(aColumn, 'name');

        // console.log('ixColumn>>>', ixColumn);

        for (let i = 0; i < validData.list_row.length; i++) {
            const vRow = validData.list_row[i];

            const idRow = Number(vRow.id);

            _.forEach(vRow, (v:any,k:string) => {

                // console.log(k, ixColumn[k]);
                if(ixColumn[k]){
                    // if(ixColumn[k].type == ColumnT.bool){
                    //     aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: Boolean(v) });
                    // }

                    // if(ixColumn[k].type == ColumnT.int){
                    //     aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: Number(v) });
                    // }

                    if(ixColumn[k].type == ColumnT.str){
                        aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: this.engineS.fClearText(v) });
                    }

                    if(ixColumn[k].type == ColumnT.text){
                        aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: this.engineS.fClearText(v) });
                    }

                    // if(ixColumn[k].type == ColumnT.uid){
                    //     aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: v });
                    // }

                    // if(ixColumn[k].type == ColumnT.decimal){
                    //     aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: Number(v) });
                    // }

                    // if(ixColumn[k].type == ColumnT.json){
                    //     try {
                    //         aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: JSON.stringify(v) });
                    //     } catch (e){
                    //         aRowData.push({ id_row: idRow, id_column:ixColumn[k].id, text: JSON.stringify({}) });
                    //     }
                    // }
                }

            });
        }

        const aInsertedWord = await this.engineS.faInsertWord(aRowData);

        await this.engineS.faInsertLetter(aInsertedWord);

        await this.engineS.faInsertIxWord(aRowData);

        await this.sourceSQL.packInsert(validData.table, validData.list_row);

        let out:R.insert.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                is_init:true,
            };
        });

        return out;
    }

}
