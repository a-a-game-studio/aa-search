
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { WordSQL } from '../../../Infrastructure/SQL/Repository/WordSQL';

// Routing
import {EngineR as R} from '../EngineR';


import {EngineV as V} from '../EngineV';

// Интерфейсы и сущьности

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class EngineM extends BaseM
{

    private wordSQL: WordSQL;

    constructor(req:any) {
        super(req);

        this.wordSQL = new WordSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
     public async select(data:R.insert.RequestI): Promise<R.insert.ResponseI> {

        const validData = this.logicSys.fValidData(V.insert(), data);

        let out:R.insert.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                is_init:true,
            };
        });

        return out;
    }
}
