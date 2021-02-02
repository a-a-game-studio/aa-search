const crc32 = require("sse4_crc32");

import _ from 'lodash';

import Knex from 'knex';

const mysql = { // Knex mysql
    client: "mysql2",
    // client: "pg",
    connection: {
        host: "localhost",
        user: "root",
        password: "Angel13q24w35e",
        database: "test_uuid",
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

const db: Knex = Knex(mysql);
const dbTovar: Knex = Knex(mysqlTovar);

async function  runInsert(){

    await db('word').truncate();
    await db('letter').truncate();

    let asDesc = (await dbTovar('tovar')
        .limit(100)
        .select('description')
    );

    asDesc = asDesc.map(v => v.description);

    let asWordPool:string[] = [
        'аля',
        'молоко',
        'молочный',
        'млоко'
    ];

    for (let i = 0; i < asDesc.length; i++) {
        const sDesc:string = asDesc[i];
        const asWord = sDesc.split(' ');

        for (let j = 0; j < asWord.length; j++) {
            const sWord = asWord[j];

            asWordPool.push(sWord.toLowerCase());
        }
    }
    
    // console.log(asWordPool);

    asWordPool = _.uniq(asWordPool);


    const aaLetter:number[][] = [];
    
    for (let i = 0; i < asWordPool.length; i++) {
        const sWord = asWordPool[i];

        console.log(sWord);
        const idWord = (await db('word')
            .insert({word:sWord, cnt:sWord.length})
        )[0];

        aaLetter[i] = [];

        const aInsert:any[] = [];

        for (let j = 0; j < sWord.length; j++) {
            aaLetter[i].push(sWord.charCodeAt(j));
            aInsert.push({id_word:idWord, code:sWord.charCodeAt(j)})

            if(sWord.length > 1){
                if(j == 0){
                    aaLetter[i].push(sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1));
                    aInsert.push({id_word:idWord, code:sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1)})
                } else if( j == sWord.length - 1){
                    aaLetter[i].push(sWord.charCodeAt(j-1)*10000 + sWord.charCodeAt(j));
                    aInsert.push({id_word:idWord, code:sWord.charCodeAt(j-1)*10000 + sWord.charCodeAt(j)})
                } else {
                    aaLetter[i].push(sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1));
                    aInsert.push({id_word:idWord, code:sWord.charCodeAt(j)*10000 + sWord.charCodeAt(j+1)})
                }
            }
        }

        // console.log(aInsert);

        (await db('letter')
            .insert(aInsert)
        );


        // for (let j = 0; j < s.length; j++) {
        //     (await db('letter')
        //         .whereIn('code',aaLetter[i])
        //         .select()
        //     );
        // }
        

        // console.log(sWord, aaLetter[i].length, aaLetter[i]);
    }

    // let lastLetter = 0;
    // let aDif = [];
    // for (let i = 0; i < a.length; i++) {
    //     a.push
    // }
   
    console.log('END');
}



async function  runSelect(){




    const aLetter:number[] = [];
    

        const sWord = 'шорты'

        console.log(sWord);

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


        

        const sLetterList = aLetter.join(',')

        const sql = `
            SELECT 
                w.word, l.id_word, 
                COUNT(l.id) cnt,
                ABS(cnt - ${aLetter.length}) diff,
                SUM(IF(l.code = ${aLetter[1]}, 1, 0)) hit_first
            FROM letter l
            LEFT JOIN word w ON w.id = id_word
            WHERE
                l.code IN (${sLetterList})
            GROUP BY l.id_word
            HAVING hit_first= 1 AND cnt > ${aLetter.length - 4} AND cnt < ${aLetter.length + 4}
            ORDER BY diff ASC
        `;

        console.log(sql)

        const resp = (await db.raw(sql))[0];


        // const resp = (await db('letter')
        //     .whereIn('code',aLetter)
        //     .groupBy('id_word')
        //     .select('id_word')
        // );
        
        

        console.log(sWord, aLetter.length, resp);


   
    console.log('END');
}

// runInsert();


runSelect();

