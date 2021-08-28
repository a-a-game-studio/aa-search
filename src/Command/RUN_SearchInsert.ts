const crc32 = require("sse4_crc32");

import _ from 'lodash';

import Knex from 'knex';
import { RedisSys } from '../System/RedisSys';
import { CacheSys } from '../System/CacheSys';
import { initMainRequest } from '../System/MainRequest';
import { cache } from 'sharp';
import { QuerySys } from '@a-a-game-studio/aa-front';

// CORE API
export const apiSearchEngine = {
    baseURL:'127.0.0.1:3005',
    timeout:30000,
    withCredentials: true,
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

    
    

    let aRowData:any[] = [];
    let iIter = 0;
    let idLastRow = 0;
    do {
        aRowData = [];

        let aRow = (await dbTovar('tovar')
            .where('id', '>', idLastRow)
            .limit(100)
            .select()
        );

        const asTovar_1C_ID = aRow.map(v => v.kod_1c);


        let aRowOstatok = (await dbTovar('ostatok')
            .whereIn('kod_1c', asTovar_1C_ID)
            .select('kod_1c', 'color', 'size')
        );

        const ixRowOstatokBy1C = _.groupBy(aRowOstatok, 'kod_1c');
        // console.log('ixRowOstatokBy1C:',ixRowOstatokBy1C);
        
        _.forEach(aRow, (v,k) => {
            let aOstatok = ixRowOstatokBy1C[v.kod_1c];
            // console.log('aOstatok:', v.kod_1c,aOstatok);
            let sOstatok = '';
            if(aOstatok){
                // console.log('aOstatok:',aOstatok);
                sOstatok = (aOstatok.map(v1 => ('цвет:'+v1.color + ' ' + 'размер:'+v1.size)) ).join(' ');
                // console.log('sOstatok:',sOstatok);
            }

            if(idLastRow < v.id){
                idLastRow = v.id;
            }

        });


        console.log('iter:', iIter, ' - ', idLastRow);
        iIter++;

        const aRowSourceInsert = aRow.map(v => {
            let aOstatok = ixRowOstatokBy1C[v.kod_1c];

            return {
                id:v.id,
                kod_1c:v.kod_1c,
                name:v.name,
                sostav:v.sostav,
                description:v.description,
                ostatok:JSON.stringify(aOstatok)
            }
        });

        await faSend({table:'tovar', list_row:aRowSourceInsert});
        

    } while( aRowData.length > 0 )

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

    await querySearchSys.faSend('/engine/insert', data);
}

runInsert();




