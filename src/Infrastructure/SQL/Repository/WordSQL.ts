
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { WordE, WordI } from '../Entity/WordE';
import _ from 'lodash';
import { LetterI } from '../Entity/LetterE';


/**
 * Здесь методы для SQL запросов
 */
export class WordSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }

    // Проверить наличие слова в базе
    public async checkWord(sWord:string): Promise<boolean>{
        let oneWord:any = null;
        oneWord = await this.cacheSys.autoCache(`fCheckWord(${sWord})`, 3600, async () => {
            try{
                
                oneWord = (await this.db(WordE.NAME)
                    .where({word:sWord})
                    .limit(1)
                    .select('id')
                )[0];
                    
            } catch(e){
                console.log('!!!ERROR>fCheckWord>', e);
            }

            return oneWord;
        })

        return oneWord ? true : false;
    }

    // Получить данные по слову в базе
    public async fOneWord(sWord:string): Promise<any>{
        let oneWord = null;
        try{

            oneWord = await this.cacheSys.autoCache(`fOneWord(${sWord})`, 3600, async () => {

                oneWord = (await this.db(WordE.NAME)
                    .where({word:sWord})
                    .limit(1)
                    .select()
                )[0]

                return oneWord;
            });
        } catch(e){
            console.log('!!!ERROR>fOneWord>', e);
        }

        return oneWord;
    }


    


    /**
     * Получить список слов
     */
    public async listByWordList(asWordClean:string[]): Promise<WordI[]>{

        let listRowWord = null;

        try{
            listRowWord = (await this.db(WordE.NAME)
                .whereIn('word', asWordClean)
                .select()
            );

        } catch (e){
            this.errorSys.errorEx(e, 'WordSQL.list', 'Не удалось получить список');
        }
        

        return listRowWord;
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
