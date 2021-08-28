
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

// Интерфейсы и сущьности

const confIndex:Record<string, number> = {
    'name':1,
    'sostav':2,
    'description':3,
    'ostatok':4
}


/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class EngineM extends BaseM
{

    private wordSQL: WordSQL;
    private sourceSQL: SourceSQL;
    private engineS: EngineS = null;

    constructor(req:any) {
        super(req);

        this.wordSQL = new WordSQL(req);
        this.sourceSQL = new SourceSQL(req);
        this.engineS = new EngineS(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async insert(data:R.insert.RequestI): Promise<R.insert.ResponseI> {

        const validData = this.logicSys.fValidData(V.insert(), data);

        let aRowData:any[] = [];

        for (let i = 0; i < validData.list_row.length; i++) {
            const vRow = validData.list_row[i];

            _.forEach(vRow, (v:any,k:string) => {
                aRowData.push({ id_row:v.id, column:confIndex[k], text:this.engineS.fClearText(v.name) });
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
