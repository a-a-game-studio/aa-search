const crc32 = require("sse4_crc32");

import _ from 'lodash';

import Knex from 'knex';
import { RedisSys } from '../System/RedisSys';
import { CacheSys } from '../System/CacheSys';
import { initMainRequest } from '../System/MainRequest';
import { cache } from 'sharp';

const mysql = { // Knex mysql
    client: "mysql2",
    // client: "pg",
    connection: {
        host: "localhost",
        user: "root",
        password: "Angel13q24w35e",
        database: "aa-search",
        decimalNumbers: true,
		dateStrings: true

    },
    pool: { "min": 0, "max": 500 },
    migrations: {
        tableName: "knex_migrations_lara_story_db",
        directory: "./src/Infrastructure/SQL/Migrations"
    },
    acquireConnectionTimeout: 60000
};

const mysqlTovar = { // Knex mysql
    client: "mysql2",
    // client: "pg",
    connection: {
        host: "localhost",
        user: "root",
        password: "Angel13q24w35e",
        database: "b14727_temp",
        decimalNumbers: true,
		dateStrings: true

    },
    pool: { "min": 0, "max": 500 },
    migrations: {
        tableName: "knex_migrations_lara_story_db",
        directory: "./src/Infrastructure/SQL/Migrations"
    },
    acquireConnectionTimeout: 60000
};

/** Конфигруация редиса */
export const redis = {
	// Конфигруация редиса
	urlDbMaster: 'redis://127.0.0.1:6379/0',
	urlDbScan: 'redis://127.0.0.1:6379/1',

	// Конфигурация сфинкс
	sphinxIndex: 'redis_core_key',
	sphinxDb: <any>null
};

const db: Knex = Knex(mysql);
const dbTovar: Knex = Knex(mysqlTovar);

const req = initMainRequest({common:{env:'dev'}});

const redisSys = new RedisSys(<any>redis);

req.infrastructure.redis = redisSys;
const cacheSys = new CacheSys(req);





const confIndex = [
    'name',
    'sostav',
    'description'
]

function runInsert(){

}

async function  runInsertLetter(){

    // await db('word').truncate();
    // await db('letter').truncate();
    await db('ix_tovar').truncate();

    let aRow = (await dbTovar('tovar')
        .limit(100)
        .select()
    );

    const aRowData = aRow.map(v => {
        return { id_row:v.id, text:v.name + ' ' + v.sostav + ' ' + v.description };
    });

    let asWordPool:{id_row:number, id_word:number, word:string}[] = [];


    let aIxWord = [];

    for (let i = 0; i < aRowData.length; i++) {
        const vRowData = aRowData[i];
        const asWord = vRowData.text.split(' ');

        for (let j = 0; j < asWord.length; j++) {
            const sWord = String(asWord[j]).trim().toLowerCase().replace(',','');


            // Проверям слово в базе
            const ifWord = await fCheckWord(sWord);
            let idWord = 0;
            if(!ifWord && sWord != '' && sWord.length > 1){

                idWord = (await db('word')
                    .insert({word:sWord, cnt:sWord.length})
                )[0];

                asWordPool.push({
                    id_row: vRowData.id_row, id_word:idWord, word:sWord
                });
            } else {
                const oneWord = await fOneWord(sWord);
                
                if(oneWord){
                    idWord = oneWord.id;
                }
            }

            console.log('===>',idWord, sWord);

            // Индекс слов
            if(idWord && sWord.length > 1){
                aIxWord.push({id_row:vRowData.id_row, id_word:idWord, cnt:sWord.length})
            }
            
        }
    }
    const aInsert:any[] = [];

    
    for (let i = 0; i < asWordPool.length; i++) {
        const vWordPool = asWordPool[i];
        const sWord = asWordPool[i].word;
        const idWord = asWordPool[i].id_word;

        // console.log(sWord);

        
        
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

    const aaInsertChunk = _.chunk(aInsert, 1000);
    for (let i = 0; i < aaInsertChunk.length; i++) {
        const aInsertChunk = aaInsertChunk[i];

        (await db('letter')
            .insert(aInsertChunk)
        );
        
    }

    const aaIxWordChunk = _.chunk(aIxWord, 1000);
    for (let i = 0; i < aaIxWordChunk.length; i++) {
        const aIxWordChunk = aaIxWordChunk[i];
        (await db('ix_tovar')
            .insert(aIxWordChunk)
        )[0];
    }
    
    // let lastLetter = 0;
    // let aDif = [];
    // for (let i = 0; i < a.length; i++) {
    //     a.push
    // }
   
    console.log('END');
}

async function fCheckWord(sWord:string): Promise<boolean>{
    let oneWord = null;
    try{
        oneWord = await cacheSys.autoCache(`fCheckWord(${sWord})`, 3600, async () => {
            oneWord = (await db('word')
                .where({word:sWord})
                .limit(1)
                .select()
            )[0];

            return oneWord;
        })
    } catch(e){
        console.log('!!!ERROR>fCheckWord>', e);
    }

    return oneWord ? true : false;
}

async function fOneWord(sWord:string): Promise<any>{
    let oneWord = null;
    try{
        oneWord = await cacheSys.autoCache(`fOneWord(${sWord})`, 3600, async () => {
            oneWord = (await db('word')
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




runInsertLetter();



