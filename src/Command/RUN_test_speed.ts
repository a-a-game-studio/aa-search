

import _, { random } from 'lodash';


import { initMainRequest } from '../System/MainRequest';
import { QuerySys } from '@a-a-game-studio/aa-front';

import https from 'https'
import { wait } from '../System/wait';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
})

// CORE API



const apiSearchEngine = {
    baseURL:'http://127.0.0.1:3007',
    timeout:30000,
    withCredentials: true,
    httpsAgent
}

const querySearchSys = new QuerySys();
querySearchSys.fConfig(apiSearchEngine);


const req = initMainRequest({common:{env:'dev'}});





let iStart = 0
let iEnd = 0

/** Отправка */
 function fSendTest(){


    querySearchSys.fInit();
    

    querySearchSys.fActionOk((data: any) => {
        iEnd++;

        if(iEnd % 1000 == 0){
            console.log('Данные успешно отправленны - ', iStart, iEnd, iStart - iEnd, data);
        }
    });

    querySearchSys.fActionErr((e:any) => {
        console.log('Произошла ошибка', e)
    });

    // console.log('Отправка данных');

    iStart++;

     querySearchSys.fSend('/engine/test-speed', {test:iStart});
}


async function run(){

    console.log('Отправка данных');


    for (let i = 0; i < 1000000; i++) {
        
        try{
            fSendTest()
        }catch(e){
            console.log('Отправка данных', e);
        }
        
        if(i % 100 == 0){
            await wait(10);
            
        }
    }
    ;
        
    await wait(1000);


    console.log('END');

    process.exit(0);
}




void run().catch((error) => {
	console.log(error);
	process.exit(1);
});





