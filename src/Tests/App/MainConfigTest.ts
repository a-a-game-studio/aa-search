import { ConfI } from "../../System/MainRequest";


export const conf: ConfI = {
    mysql: { // Knex mysql
        "client": "mysql",
        "connection": {
            "host": "localhost",
            "user": "root",
            "password": "12345",
            "database": "aacore"
        },
        "pool": { "min": 0, "max": 7 },
        "migrations": {
            "tableName": "knex_migrations",
            "directory": "./lib/Infrastructure/SQL/Migrations"
        },
        "acquireConnectionTimeout": 60000
    },
    common:{
        env:'dev',
        port:3007,
    },


    redis: { // Конфигруация редиса
        "url": "redis://127.0.0.1:6379"
    },

    /**
    Конфиг подклчения RabbitMQ
    Для запуска на локальной машине
    docker run -d --hostname 0.0.0.0 --network host rabbitmq:3

    Документация
    https://docs.docker.com/samples/library/rabbitmq/
    https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
    */

    rabbit: {
        // Список очередей которые будут подняты
        queryList:{ // Список очередей
            query1:'query1' // Очередь для картинок каталога
        },
        // Соединение с кроликом
        connection: 'amqp://localhost:5672'
    },

    S3: {
        endpoint: 'https://file.yousite.ru:8000',
        bucket:  'backet1',        
        access: 'accessKey1',
        secret: 'verySecretKey1',
    },
    
    FileModule : {
        sSavePath: __dirname + '/../../../src/Tests/App/public/', // полный путь к папке с файлами
        sUrl: '/img/', // url файлов
    } // для молуля File
};
