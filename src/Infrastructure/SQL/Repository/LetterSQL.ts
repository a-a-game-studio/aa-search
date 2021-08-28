
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { LetterE, LetterI } from '../Entity/LetterE';
import _ from 'lodash';


/**
 * Здесь методы для SQL запросов
 */
export class LetterSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список слов
     */
    public async list(): Promise<LetterI[]>{

        let resp = null;

        try{
            resp = (await this.db(LetterE.NAME)
                .select()
                .limit(30)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'LetterSQL.list', 'Не удалось получить список');
        }
        

        return resp;
    }

    /**
     * Получить список слов
     */
    public async insert(data:LetterI): Promise<number>{

        const validData = this.logicSys.fValidData(LetterE.getRulesInsert(), data)

        let idLetter = 0;

        try{
            idLetter = (await this.db(LetterE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'LetterSQL.list', 'Не удалось получить список');
        }

        return idLetter;
    }

    /**
     * Получить список слов
     */
     public async packInsert(aLetter:LetterI[]): Promise<number>{

        let idWord = 0;

        try{
            const aaInsertChunk = _.chunk(aLetter, 1000);
            for (let i = 0; i < aaInsertChunk.length; i++) {
                const aInsertChunk = aaInsertChunk[i];

                (await this.db(LetterE.NAME)
                    .insert(aInsertChunk)
                );
                
            }

        } catch (e){
            this.errorSys.errorEx(e, 'WordSQL.list', 'Не удалось получить список');
        }

        return idWord;
    }


    /**
     * Получить список слов
     */
    public async update(data:LetterI): Promise<number>{

        const validData = this.logicSys.fValidData(LetterE.getRulesUpdate(), data)

        let idLetter = 0;

        try{
            idLetter = (await this.db(LetterE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'LetterSQL.list', 'Не удалось получить список');
        }

        return idLetter;
    }

}
