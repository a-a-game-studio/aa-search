
// Системные классы
import BaseM from '../../System/BaseM';

// Классы SQL Запросов
import { WordSQL } from '../../Infrastructure/SQL/Repository/WordSQL';

// Routing
import {AdminEditEnumR} from './AdminEditEnumR';
import R = AdminEditEnumR;

import * as V from './AdminEditEnumV';

// Интерфейсы и сущьности

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class AdminEditEnumM extends BaseM
{

    private vWordSQL: WordSQL;

    constructor(req:any) {
        super(req);

        this.vWordSQL = new WordSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async insert(data:R.insert.RequestI): Promise<R.insert.ResponseI> {

        const validData = <R.insert.RequestI>V.insert(this.req, data);

        let out:R.insert.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                is_init:true,
            };
        });

        return out;
    }

}
