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

    
    

    const sPhrase = 'стринги из хлопка';

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

            const sLetterList = aLetter.join(',')

            const sql = `
                SELECT
                    w.word, l.id_word, 
                    COUNT(l.id) cnt_letter,
                    ABS(w.cnt*2 - ${aLetter.length}) diff,
                    SUM(IF(l.code = ${aLetter[1]}, 1, 0)) hit_first
                FROM letter l
                LEFT JOIN word w ON w.id = id_word
                WHERE
                    l.code IN (${sLetterList})
                GROUP BY l.id_word
                HAVING hit_first= 1 AND cnt_letter > ${aLetter.length - 4} AND cnt_letter < ${aLetter.length + 4}
                ORDER BY diff ASC
                LIMIT 10
            `;

            console.log(sql)

            const resp:any[] = (await db.raw(sql))[0];

            const aidWord = resp.map(v => v.id_word);

            for (let c = 0; c < resp.length; c++) {
                const vWord = resp[c];
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

    } // ======================================

    aidWordFind = _.uniq(aidWordFind);

    console.log('aidWordFind:',aidWordFind.join(','));

    const asIfWeight:string[] = [];
    let sQueryWeight = `VALUES `;
    _.forEach(ixWordWeight, (v,k) => { 
        asIfWeight.push(`ROW(${k},${v})`)
    })
    sQueryWeight += asIfWeight.join(',');
    console.log('weight:',sQueryWeight);


    // const resp = (await db('letter')
    //     .whereIn('code',aLetter)
    //     .groupBy('id_word')
    //     .select('id_word')
    // );
    
    { // 
        const sql = `
            SELECT COUNT(*) cnt_word, SUM(q2.w) sum_weight, w.word, ix_t.*, source_t.*
            FROM ix_tovar ix_t 
            LEFT JOIN source_tovar source_t ON source_t.id = ix_t.id_row
            LEFT JOIN word w ON w.id = ix_t.id_word
            LEFT JOIN (
                SELECT * FROM (
                    VALUES ROW(160,10),ROW(365,10),ROW(401,8),ROW(410,6),ROW(418,6),ROW(551,8),ROW(591,8),ROW(1169,6),ROW(1245,8),ROW(2669,6),ROW(2708,10),ROW(4617,8),ROW(4628,8),ROW(4791,10)
                ) q1(id_word, w) 
            ) q2 ON q2.id_word = ix_t.id_word
            WHERE 
                ix_t.id_word IN (2708,551,1245,2669,2698,4712,2662,4711,2158,2941,365,4791,160,4628,401,4617,591,1169,410,418)
            GROUP BY ix_t.id_row
            ORDER BY cnt_word DESC, sum_weight DESC
            ;
        `;
    }
    

    // console.log(sWord, aLetter.length, resp);


   
    console.log('END');
}

runSelect();

