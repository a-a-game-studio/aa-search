
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
     * Поиск слова по буквам
     */
     public async searchWord(aLetter:number[]): Promise<{
        id_word:number, // ID найденного слова
        word:string, // Слово
        cnt_letter: number, // Количество символов
        diff: number, // разница в совпадении
        hit_first: number // совпадение первой буквы
     }[]>{


        const sLetterList = aLetter.join(',')

        let resp:any[] = [];

        if(aLetter.length){
            try{
                const sql = `
                    SELECT
                        w.word, l.id_word, 
                        COUNT(l.id) cnt_letter,
                        ABS(w.cnt*2 - :cnt_letter) diff,
                        SUM(IF(l.code = :code_first_letter, 1, 0)) hit_first
                    FROM letter l
                    LEFT JOIN word w ON w.id = l.id_word
                    WHERE
                        l.code IN (${sLetterList})
                    GROUP BY l.id_word
                    HAVING hit_first= 1 AND cnt_letter > :cnt_letter_min AND cnt_letter < :cnt_letter_max
                    ORDER BY diff ASC
                    LIMIT 10
                `;

                const queryParam = {
                    cnt_letter: aLetter.length, // Количество кодов букв
                    cnt_letter_min: aLetter.length - 4, // минимальная погрешность длинны слова
                    cnt_letter_max: aLetter.length + 4, // максимальная погрешность длинны слова
                    code_first_letter: aLetter[1] // Первый код слова
                };

                console.log(this.db.raw(sql, queryParam).toString())

                resp= (await this.db.raw(sql, queryParam))[0];

            } catch (e){
                this.errorSys.errorEx(e, 'LetterSQL.list', 'Не удалось получить список');
            }
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
            this.errorSys.errorEx(e, 'LetterSQL.insert', 'Не удалось получить список');
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
