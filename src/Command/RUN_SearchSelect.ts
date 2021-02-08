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

const db: Knex = Knex(mysql);


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

runSelect();

