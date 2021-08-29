const crc32 = require("sse4_crc32");

import _ from 'lodash';

import Knex from 'knex';
import { RedisSys } from '../System/RedisSys';
import { CacheSys } from '../System/CacheSys';
import { initMainRequest } from '../System/MainRequest';
import { cache } from 'sharp';
import { QuerySys } from '@a-a-game-studio/aa-front';

import https from 'https'

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
})

// CORE API
export const apiSearchEngine = {
    baseURL:'http://127.0.0.1:3007',
    timeout:5000,
    withCredentials: true,
    httpsAgent
}

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


const querySearchSys = new QuerySys();
querySearchSys.fConfig(apiSearchEngine);


const confIndex = {
    'name':1,
    'sostav':2,
    'description':3,
    'ostatok':4
}

async function runInsert(){
    await db('ix_tovar').truncate();
    await db('source_tovar').truncate();

    
    

    let aRow:any[] = [];
    let iIter = 0;
    let idLastRow = 0;
    do {

        aRow = (await dbTovar('tovar')
            .where('id', '>', idLastRow)
            .limit(10)
            .select()
        );

        const asTovar_1C_ID = aRow.map(v => v.kod_1c);


        let aRowOstatok = (await dbTovar('ostatok')
            .whereIn('kod_1c', asTovar_1C_ID)
            .select('kod_1c', 'color', 'size')
        );

        const ixRowOstatokBy1C = _.groupBy(aRowOstatok, 'kod_1c');
        // console.log('ixRowOstatokBy1C:',ixRowOstatokBy1C);
        
        const aRowInsert:any[] = []
        _.forEach(aRow, (v,k) => {
            let aOstatok = ixRowOstatokBy1C[v.kod_1c];
            let sOstatok = '';
            if(aOstatok){

                sOstatok = (aOstatok.map(v1 => ('цвет:'+v1.color + ' ' + 'размер:'+v1.size)) ).join(' ');

            }

            aRowInsert.push({
                id:v.id,
                kod_1c:v.kod_1c,
                name:v.name,
                sostav:v.sostav,
                description:v.description,
                ostatok:sOstatok
            })

            if(idLastRow < v.id){
                idLastRow = v.id;
            }

        });


        console.log('iter:', iIter, ' - ', idLastRow);
        iIter++;

        await faSend({table:'tovar', list_row:aRowInsert});
        

    } while( aRow.length > 0 )

    console.log('END');
}

/** Отправка */
async function faSend(data:{table:string, list_row:any[]}){
    querySearchSys.fInit();

    querySearchSys.fActionOk((data: any) => {
        console.log('Данные успешно отправленны')
    });

    querySearchSys.fActionErr((e:any) => {
        console.log('Произошла ошибка', e)
    });

    console.log('Отправка данных');

    await querySearchSys.faSend('/engine/insert', data);
}


runInsert();




