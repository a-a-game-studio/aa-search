
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { WordE, WordI } from '../Entity/WordE';


/**
 * Здесь методы для SQL запросов
 */
export class WordSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список слов
     */
    public async list(): Promise<WordI[]>{

        let resp = null;

        try{
            resp = (await this.db(WordE.NAME)
                .select()
                .limit(30)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'WordSQL.list', 'Не удалось получить список');
        }
        

        return resp;
    }

    /**
     * Получить список слов
     */
    public async insert(data:WordI): Promise<number>{

        const validData = this.logicSys.fValidData(WordE.getRulesInsert(), data)

        let idWord = 0;

        try{
            idWord = (await this.db(WordE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'WordSQL.list', 'Не удалось получить список');
        }

        return idWord;
    }


    /**
     * Получить список слов
     */
    public async update(data:WordI): Promise<number>{

        const validData = this.logicSys.fValidData(WordE.getRulesUpdate(), data)

        let idWord = 0;

        try{
            idWord = (await this.db(WordE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'WordSQL.list', 'Не удалось получить список');
        }

        return idWord;
    }

}
