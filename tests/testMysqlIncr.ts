
import Knex from 'knex';
import _, { uniqueId } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
// var crc32 = require('crc32');
const crc32 = require("sse4_crc32")

import uniqid from 'uniqid'

const mysql = { // Knex mysql
    client: "mysql2",
    // client: "pg",
    connection: {
        host: "localhost",
        user: "root",
        password: "Angel13q24w35e",
        database: "test_uuid",
        // host: "localhost",
        // user: "postgres",
        // password: "Angel13q24w35e",
        // database: "postgres",
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

const db: Knex = Knex(mysql);

let iDublicate = 0;

async function runInsert(){

    
    
    console.log('runInsert>>>')

    // 
    const aItem:any[] = [];
    const aChar:any[] = [];
    for (let i = 0; i < 3000; i++) {
        const uidItem = uuidv4();


        aItem.push({
            id:uidItem,
            name:'name-'+uidItem
        });

        for (let j = 0; j < 10; j++) {
            const uidChar = uuidv4();

            aChar.push({
                id:uidChar,
                item_id:uidItem,
                key:'key-'+uidItem+'-'+uidChar,
                val:'val-'+uidItem+'-'+uidChar,
            });
            
        }

        // process.stdout.write('.')
        
    }

    const aaItem = _.chunk(aItem, 10);
    for (let i = 0; i < aaItem.length; i++) {
        const aItemChunk = aaItem[i];

        (await db('item')
            .insert(aItemChunk)
        );

        process.stdout.write('.')
    }

    const aaChar = _.chunk(aChar, 10);
    for (let i = 0; i < aaChar.length; i++) {
        const aCharChunk = aaChar[i];

        (await db('char')
            .insert(aCharChunk)
        );

        process.stdout.write('.')
    }
    
};



async function runSelect(){

    for (let i = 0; i < 10; i++) {

        const sql = `
            SELECT i.id, i.incr, COUNT(c.id) FROM item i
            LEFT JOIN \`char\` c ON c.item_id = i.id
            WHERE
                i.incr > incr
            GROUP BY i.id
            LIMIT 1000
            ;
        `;

    
        (await db.raw(sql, {incr:i*10}));
    }
}

async function run(keyLog:number){

    for (let i = 0; i < 100; i++) {
        console.time('runInsert'+keyLog);
        try{
            // await runInsert();
            await runSelect();
        } catch(e){
            console.log('!!!ERROR>>>',e);
            iDublicate++;
        }
        console.timeEnd('runInsert'+keyLog);
        // console.log('!!!dublicate>>>', iDublicate);
    }

    // console.time('randomIntegerCrc32');
    // for (let i = 0; i < 100000; i++) {
    //     let uid = randomIntegerUuid4();
    // }
    // console.timeEnd('randomIntegerCrc32');

    console.log('END')
}


function randomIntegerUuid4():bigint {
    let sUuid = uuidv4();

    // console.log(sUuid, sUuid.length);

    let aSymbol:number[] = [];
    for (let c = 0; c < sUuid.length; c++) {
        if(sUuid[c] !== '-'){
            let iSymbol = sUuid.charCodeAt(c);

            if(iSymbol < 100){
                iSymbol = iSymbol % 100;            
            }

            aSymbol.push(iSymbol);
            
        }
    }

    let sSymbol2 = aSymbol.join('');
    console.log(sUuid, sSymbol2, sSymbol2.length);
    sSymbol2 = randomInteger(1,8) + sSymbol2.slice(0, 18);

    let iSymbol2 = BigInt(sSymbol2);
    // console.log(sUuid, iSymbol2);
    return iSymbol2
}

/**
 * Генерация случайного числа в между двумя числами включительно
 * @param min 
 * @param max 
 */
export function randomInteger(min:number, max:number):number {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

for (let i = 0; i < 10; i++) {
    
    run(i);
}


