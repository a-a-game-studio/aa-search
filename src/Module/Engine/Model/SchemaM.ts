
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
import { TableSQL } from '../../../Infrastructure/SQL/Repository/TableSQL';
import { ColumnSQL } from '../../../Infrastructure/SQL/Repository/ColumnSQL';
import { ColumnT } from '../../../Infrastructure/SQL/Entity/ColumnE';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class SchemaM extends BaseM
{
    private tableSQL: TableSQL = null;
    private columnSQL: ColumnSQL = null;

    constructor(req:any) {
        super(req);

        this.tableSQL = new TableSQL(req);
        this.columnSQL = new ColumnSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async createTable(data:R.createTable.RequestI): Promise<R.createTable.ResponseI> {

        const validData = this.logicSys.fValidData(V.createTable(), data);

        const idTable = await this.tableSQL.insert({name:validData.table});

        for (let i = 0; i < validData.list_column.length; i++) {
            const vColumn = validData.list_column[i];

            if(ColumnT[vColumn.type]){

                await this.columnSQL.insert({
                    id_table: idTable,
                    name: validData.table,
                    type: ColumnT[vColumn.type]
                });
            }
        }

        let out:R.createTable.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                id_table:idTable,
            };
        });

        return out;
    }

    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
     public async delTable(data:R.delTable.RequestI): Promise<R.delTable.ResponseI> {

        const validData = this.logicSys.fValidData(V.delTable(), data);

        await this.tableSQL.del(validData.table);

        return null;
    }

}
