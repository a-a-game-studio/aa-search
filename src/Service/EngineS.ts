var fs = require('fs');
import _ from 'lodash';
import { LetterE } from '../Infrastructure/SQL/Entity/LetterE';
import { IxSQL } from '../Infrastructure/SQL/Repository/IxSQL';
import { LetterSQL } from '../Infrastructure/SQL/Repository/LetterSQL';
import { WordSQL } from '../Infrastructure/SQL/Repository/WordSQL';
import BaseM from '../System/BaseM';

/**
 * Сервис автоматизаций по работе с картинками
 */
export class EngineS extends BaseM {

    private wordSQL: WordSQL;
    private letterSQL: LetterSQL;
    private ixSQL:IxSQL;

    constructor(req:any) {
        super(req);

        this.wordSQL = new WordSQL(req);
        this.letterSQL = new LetterSQL(req);
        this.ixSQL = new IxSQL(req);
    }

    /** Вставка индекса букв */
    public async faInsertLetter(aRowData:{
        id_word: number;
        word: string;
    }[]){
        
        const aInsert:any[] = [];
        
        for (let i = 0; i < aRowData.length; i++) {
            const sWord = aRowData[i].word;
            const idWord = aRowData[i].id_word;

            for (let j = 0; j < sWord.length; j++) {
                aInsert.push({id_word:idWord, code:sWord.charCodeAt(j)})

                if(sWord.length > 1){
                    if(j == 0){
                        aInsert.push({id_word:idWord, code:sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1)})
                    } else if( j == sWord.length - 1){
                        aInsert.push({id_word:idWord, code:sWord.charCodeAt(j-1)*10000 + sWord.charCodeAt(j)})
                    } else {
                        aInsert.push({id_word:idWord, code:sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1)})
                    }
                }
            }

            // console.log(sWord, aaLetter[i].length, aaLetter[i]);
        }

        await this.letterSQL.packInsert(aInsert);
    
    }

    /** Вставка уникальных слов */
    public async faInsertWord(aRowData:{
        id_row: number; // ID строки
        text: string; // Текст
    }[]): Promise<{
        id_word:number;
        word:string;
    }[]>{ // ID WORD

        let asWordPool:{id_word:number, word:string}[] = [];

        for (let i = 0; i < aRowData.length; i++) {
            const vRowData = aRowData[i];
            const asWord = vRowData.text.split(' ');

            for (let j = 0; j < asWord.length; j++) {
                const sWord = String(asWord[j]).trim();

                let idWord = 0;
                // Проверям слово в базе
                if(sWord.length > 1){
                    const ifWord = await this.wordSQL.checkWord(sWord);
                    
                    
                    if(!ifWord && sWord != ''){

                        idWord = await this.wordSQL.insert({word:sWord, cnt:sWord.length});
                        console.log('===>',idWord, sWord);

                        asWordPool.push({
                            id_word:idWord, word:sWord
                        });
                    }
                }
                
            }
        }

        return asWordPool;
    }

    /** Вставка индекса слов */
    public async faInsertIxWord(aRowData:{
        id_row: number; // ID строки
        id_column:number; // ID колонки
        text: string; // Текст
    }[]): Promise<void>{

        let aIxWord:{id_row:number; id_column:number; id_word:number; cnt:number}[] = [];

        for (let i = 0; i < aRowData.length; i++) {
            const vRowData = aRowData[i];
            const asWord = vRowData.text.split(' ');

            const asWordClean:string[] = [];

            const ixWordCounter:Record<string, number> = {};
            for (let j = 0; j < asWord.length; j++) {
                const sWord = String(asWord[j]).trim();

                if(sWord.length > 1){
                    asWordClean.push(sWord);

                    if(!ixWordCounter[sWord]){
                        ixWordCounter[sWord] = 1;
                    } else {
                        ixWordCounter[sWord]++;
                    }

                }
            }

            // console.log('asWordClean:',asWordClean);

            let aRowWord = await this.wordSQL.listByWordList(asWordClean);

            // console.log('aRowWord:',aRowWord);

            const ixWordDict = _.keyBy(aRowWord, 'word')
            const akWordDict = Object.keys(ixWordDict);

            for (let j = 0; j < akWordDict.length; j++) {
                const sWord = akWordDict[j];
                const vWord = ixWordDict[sWord];
                const idWord = vWord.id;

                aIxWord.push({id_row:vRowData.id_row, id_column:vRowData.id_column, id_word:idWord, cnt:ixWordCounter[sWord]})
            }
        }

        // console.log('aIxWord>>>', aIxWord);

        await this.ixSQL.packInsert('tovar', aIxWord);

        return null;
    }

    public fClearText(text:string) : string{
        return text.replace(/[,."'!&?]/g,' ').replace(/\s+/g,' ').toLowerCase();
    }

}