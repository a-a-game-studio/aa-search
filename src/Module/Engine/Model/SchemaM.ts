
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
import { IxSQL } from '../../../Infrastructure/SQL/Repository/IxSQL';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class SchemaM extends BaseM
{
    private tableSQL: TableSQL = null;
    private columnSQL: ColumnSQL = null;
    private ixSQL: IxSQL = null;
    private sourceSQL: SourceSQL = null;

    constructor(req:any) {
        super(req);

        this.tableSQL = new TableSQL(req);
        this.columnSQL = new ColumnSQL(req);
        this.ixSQL = new IxSQL(req);
        this.sourceSQL = new SourceSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async createTable(data:R.createTable.RequestI): Promise<R.createTable.ResponseI> {

        const validData = this.logicSys.fValidData(V.createTable(), data);

        const idTable = await this.tableSQL.insert({name:validData.table});
        const aColumnNewTable:{name:string; type:ColumnT}[] = [];

        for (let i = 0; i < validData.list_column.length; i++) {
            const vColumn = validData.list_column[i];

            if(ColumnT[vColumn.type]){

                aColumnNewTable.push({name:vColumn.name,type:ColumnT[vColumn.type]})

                await this.columnSQL.insert({
                    id_table: idTable,
                    name: vColumn.name,
                    type: ColumnT[vColumn.type]
                });
            }
        }

        // Создаем индексы для таблицы
        await this.ixSQL.createTable(validData.table);

        // Создаем исходники таблицы
        await this.sourceSQL.createTable(validData.table, aColumnNewTable);

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

        const vTable = await this.tableSQL.oneByName(validData.table);
        await this.tableSQL.del(validData.table);
        await this.columnSQL.delByTable(vTable.id);

        await this.ixSQL.dropTable(validData.table);
        await this.sourceSQL.dropTable(validData.table);

        return null;
    }

    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async clearTable(data:R.clearTable.RequestI): Promise<R.clearTable.ResponseI> {

        const validData = this.logicSys.fValidData(V.clearTable(), data);

        await this.ixSQL.truncateTable(validData.table);
        await this.sourceSQL.truncateTable(validData.table);

        return null;
    }

}
