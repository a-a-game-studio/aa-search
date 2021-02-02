// Update with your config settings.

// Конфиг для настройки миграций в старой MySQL базе данных

import conf from './src/Config/MainConfig'

module.exports = {

    development: conf.mysql,

    staging: conf.mysql,

    production: conf.mysql

};
