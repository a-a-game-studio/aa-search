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
        table:'active_item'
    });

    // =============================================

    // querySearchSys.fInit();
    // querySearchSys.fActionOk((data: any) => {
    //     console.log('Данные успешно отправленны')
    // });
    // querySearchSys.fActionErr((e:any) => {
    //     console.log('Произошла ошибка', e)
    // });

    // console.log('Отправка данных');
    // await querySearchSys.faSend('/engine/create-table', <EngineR.createTable.RequestI>{
    //     table:'tovar', 
    //     list_column: [
    //         { name:'kod_1c', type: 'uid' },
    //         { name:'name', type: 'str' },
    //         { name:'sostav', type: 'text' },
    //         { name:'description', type: 'text' },
    //         { name:'ostatok', type: 'text' },
    //     ]
    // });

    // ===============================================

    querySearchSys.fInit();
    querySearchSys.fActionOk((data: any) => {
        console.log('Таблица active_item - успешшно создана')
    });
    querySearchSys.fActionErr((e:any) => {
        console.log('Таблица active_item - не удалось создать', e)
    });

    console.log('Отправка данных');
    await querySearchSys.faSend('/engine/create-table', <EngineR.createTable.RequestI>{
        table:'active_item', 
        list_column: [
            { name:'stock_name', type: 'str' },
            { name:'purchase_name', type: 'str' },
            { name:'category_name', type: 'str' },
            { name:'catalog_name', type: 'str' },
            { name:'item_name', type: 'str' },
            { name:'article', type: 'str' },
            
            // Текстовые поля
            { name:'item_desc', type: 'text' },
            { name:'characteristic', type: 'text' },
            { name:'tags_name', type: 'text' },
            { name:'category_keyword', type: 'text' },

            // JSON
            { name:'characteristic_ids', type: 'text' },
            { name:'tags_id', type: 'text' },

            
            // INT
            { name:'item_id', type: 'int' },
            { name:'stock_id', type: 'int' },
            { name:'purchase_id', type: 'int' },
            { name:'purchase_state_id', type: 'int' },
            { name:'category_id', type: 'int' },
            { name:'catalog_id', type: 'int' },
            { name:'org_id', type: 'int' },
            { name:'item_org_fee', type: 'int' },
            { name:'cnt_order', type: 'int' },
            { name:'consumer_rating', type: 'int' },

            { name:'is_adult', type: 'bool' },
            { name:'is_bundle', type: 'bool' },
            
            { name:'item_price', type: 'decimal' },
            
            
            
            
        ]
    });

    console.log('END');
}

runInsert();




