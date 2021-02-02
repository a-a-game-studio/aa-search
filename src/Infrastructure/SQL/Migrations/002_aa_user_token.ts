const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');

export const up = async function(knex:any, Promise:any) {
    const hasUserToken = await knex.schema.hasTable('aa_user_token');

    if (hasUserToken) {
        await knex.schema.dropTable('aa_user_token');
    }

    await knex.schema.createTable('aa_user_token', (table:any) => {
        table.increments('id');

        table.integer('id_user').index('id_user')
            .comment('ID пользователя');

        table.string('token', 55).unique('token')
            .comment('apikey - ключ доступа пользователя');

        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');
            
        table.comment('Связывает пользователя и группу');
        table.collate('utf8_bin');
    });

    let user = (await knex('aa_user')
        .where({
            login:'admin'
        })
        .limit(1)
        .select()
    )[0];
    
    await knex('aa_user_token')
        .insert({
            id_user:user.id,
            token:uniqid(uuidv4()+'-')
        });
    
};

export const down = async (knex:any) => {
    const hasUserToken = await knex.schema.hasTable('aa_user_token');
    if (hasUserToken) {
        // await knex.schema.dropTable('aa_user_token');
    }

    return knex.schema;
};