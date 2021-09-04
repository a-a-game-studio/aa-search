
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { WordSQL } from '../../../Infrastructure/SQL/Repository/WordSQL';

// Routing
import {EngineR as R} from '../EngineR';


import {EngineV as V} from '../EngineV';
import { LetterSQL } from '../../../Infrastructure/SQL/Repository/LetterSQL';
import _ from 'lodash';
import { IxSQL } from '../../../Infrastructure/SQL/Repository/IxSQL';
import { SourceSQL } from '../../../Infrastructure/SQL/Repository/SourceSQL';

// Интерфейсы и сущьности

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class SelectM extends BaseM
{

    private wordSQL: WordSQL;

    private letterSQL: LetterSQL;

    private ixSQL: IxSQL;

    private sourceSQL: SourceSQL;

    constructor(req:any) {
        super(req);

        this.wordSQL = new WordSQL(req);
        this.letterSQL = new LetterSQL(req);
        this.ixSQL = new IxSQL(req);
        this.sourceSQL = new SourceSQL(req);
    }

    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
     public async search(data:R.search.RequestI): Promise<R.search.ResponseI> {

        const validData = this.logicSys.fValidData(V.search(), data);

        const sPhrase = validData.search

        console.log(sPhrase);

        const asWord = sPhrase.split(' ');

        let aidWordFind:number[] = [];
        let ixWordWeight:{[key:number]:number} = {};

        for (let i = 0; i < asWord.length; i++) {
            const sWord = asWord[i].trim();
            const aLetter:number[] = [];

            console.log(sWord);

            if(sWord.length > 2){
            
                for (let j = 0; j < sWord.length; j++) {
                    aLetter.push(sWord.charCodeAt(j));
                    if(j == 0){
                        aLetter.push(sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1));
                    } else if( j == sWord.length - 1){
                        aLetter.push(sWord.charCodeAt(j-1)*10000 + sWord.charCodeAt(j));
                    } else {
                        aLetter.push(sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1));
                    }
                }

                const respSearch = await this.letterSQL.searchWord(aLetter);

                console.log('respSearch>>>', respSearch)

                const aidWord = respSearch.map(v => v.id_word);

                for (let c = 0; c < respSearch.length; c++) {
                    const vWord = respSearch[c];
                    if(ixWordWeight[vWord.id_word]){
                        if(10 - vWord.diff > 0){
                            ixWordWeight[vWord.id_word] += 10 - vWord.diff;
                        }
                    } else {
                        if(10 - vWord.diff > 0){
                            ixWordWeight[vWord.id_word] = 10 - vWord.diff;
                        }
                    }
                }

                for (let c = 0; c < aidWord.length; c++) {
                    const idWord = aidWord[c];
                    aidWordFind.push(idWord);
                }
            }
        }

        aidWordFind = _.uniq(aidWordFind);

        console.log('aidWordFind:',aidWordFind.join(','));

        const ixColumnWeight:Record<number, number> = {2: 10};
        

        const findRow = await this.ixSQL.searchRow(aidWordFind, ixWordWeight, ixColumnWeight);

        const aidRow = findRow.map(el => el.id_row);

        const aRow = await this.sourceSQL.list('tovar',aidRow);
        console.log('aRow>>>', aRow);

        let out:R.search.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                list_row:aRow,
            };
        });

        return out;
    }
}
