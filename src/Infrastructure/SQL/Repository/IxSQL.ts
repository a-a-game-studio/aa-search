
// Библиотеки



// Системные сервисыW
import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { IxE, IxI } from '../Entity/IxE';
import _ from 'lodash';


/**
 * Здесь методы для SQL запросов
 */
export class IxSQL extends BaseSQL
{

    constructor(req:MainRequest) {
        super(req);
    }


    /**
     * Получить список слов
     */
    public async list(): Promise<IxI[]>{

        let resp = null;

        try{
            resp = (await this.db(IxE.NAME)
                .select()
                .limit(30)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.list', 'Не удалось получить список');
        }
        

        return resp;
    }

    /**
     * Получить список слов
     */
    public async insert(data:IxI): Promise<number>{

        const validData = this.logicSys.fValidData(IxE.getRulesInsert(), data);

        let idIx = 0;
        try{
            idIx = (await this.db(IxE.NAME)
                .insert(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.insert', 'Не удалось получить список');
        }

        return idIx;
    }

    /**
     * Получить список слов
     */
    public async packInsert(sTable:string, aIxWord:IxI[]): Promise<number> {

        let idIx = 0;

        try{
            const aaIxWordChunk = _.chunk(aIxWord, 1000);
            for (let i = 0; i < aaIxWordChunk.length; i++) {
                const aIxWordChunk = aaIxWordChunk[i];
                (await this.db(IxE.NAME + sTable)
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
    public async update(data:IxI): Promise<number>{

        const validData = this.logicSys.fValidData(IxE.getRulesUpdate(), data)

        let idIx = 0;

        try{
            idIx = (await this.db(IxE.NAME)
                .update(validData)
            );

        } catch (e){
            this.errorSys.errorEx(e, 'IxSQL.update', 'Не удалось получить список');
        }

        return idIx;
    }

}
