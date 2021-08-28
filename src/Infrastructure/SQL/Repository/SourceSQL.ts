
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { SourceE, SourceI } from '../Entity/SourceE';
import _ from 'lodash';

/**
 * Здесь методы для SQL запросов
 */
export class SourceSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список слов
     */
    public async list(): Promise<SourceI[]>{

        let resp = null;

        try{
            resp = (await this.db(SourceE.NAME)
                .select()
                .limit(30)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.list', 'Не удалось получить список');
        }
        

        return resp;
    }

    /**
     * Получить список слов
     */
    public async insert(data:SourceI): Promise<number>{

        const validData = this.logicSys.fValidData(SourceE.getRulesInsert(), data)

        let idSource = 0;

        try{
            idSource = (await this.db(SourceE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.list', 'Не удалось получить список');
        }

        return idSource;
    }

    /**
     * Получить список слов
     */
     public async packInsert(sTable:string, aIxWord:SourceI[]): Promise<number> {

        let idIx = 0;

        try{
            const aaIxWordChunk = _.chunk(aIxWord, 1000);
            for (let i = 0; i < aaIxWordChunk.length; i++) {
                const aIxWordChunk = aaIxWordChunk[i];
                (await this.db(SourceE.NAME + sTable)
                    .insert(aIxWordChunk)
                );
            }

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.packInsert', 'Не удалось получить список');
        }

        return idIx;
    }


    /**
     * Получить список слов
     */
    public async update(data:SourceI): Promise<number>{

        const validData = this.logicSys.fValidData(SourceE.getRulesUpdate(), data)

        let idSource = 0;

        try{
            idSource = (await this.db(SourceE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'SourceSQL.list', 'Не удалось получить список');
        }

        return idSource;
    }

}
