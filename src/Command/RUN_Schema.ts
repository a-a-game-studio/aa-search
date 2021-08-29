const crc32 = require("sse4_crc32");

import _ from 'lodash';

import Knex from 'knex';
import { RedisSys } from '../System/RedisSys';
import { CacheSys } from '../System/CacheSys';
import { initMainRequest } from '../System/MainRequest';
import { cache } from 'sharp';
import { QuerySys } from '@a-a-game-studio/aa-front';

import https from 'https'
import { EngineR } from '../Module/Engine/EngineR';

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

/** Конфигруация редиса */
export const redis = {
	// Конфигруация редиса
	urlDbMaster: 'redis://127.0.0.1:6379/0',
	urlDbScan: 'redis://127.0.0.1:6379/1',

	// Конфигурация сфинкс
	sphinxIndex: 'redis_core_key',
	sphinxDb: <any>null
};

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

    querySearchSys.fInit();
    querySearchSys.fActionOk((data: any) => {
        console.log('Данные успешно отправленны')
    });
    querySearchSys.fActionErr((e:any) => {
        console.log('Произошла ошибка', e)
    });

    console.log('Отправка данных');
    await querySearchSys.faSend('/engine/del-table', <EngineR.delTable.RequestI>{
        table:'tovar'
    });

    // =============================================

    querySearchSys.fInit();
    querySearchSys.fActionOk((data: any) => {
        console.log('Данные успешно отправленны')
    });
    querySearchSys.fActionErr((e:any) => {
        console.log('Произошла ошибка', e)
    });

    console.log('Отправка данных');
    await querySearchSys.faSend('/engine/create-table', <EngineR.createTable.RequestI>{
        table:'tovar', 
        list_column: [
            { name:'kod_1c', type: 'uid' },
            { name:'name', type: 'str' },
            { name:'sostav', type: 'text' },
            { name:'description', type: 'text' },
            { name:'ostatok', type: 'json' },
        ]
    });

    console.log('END');
}

runInsert();




