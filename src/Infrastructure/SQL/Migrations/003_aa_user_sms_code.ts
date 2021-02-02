
export const up = async function(knex:any, Promise:any) {
    const hasUserSmsCode = await knex.schema.hasTable('aa_user_sms_code');

    if (hasUserSmsCode) {
        await knex.schema.dropTable('aa_user_sms_code');
    }

    await knex.schema.createTable('aa_user_sms_code', (table:any) => {
        table.increments('id');

        table.integer('id_user').index('id_user')
            .comment('ID пользователя');

        table.string('phone', 20).index('phone')
            .comment('Код подтверждения');

        table.string('code', 50).index('code')
            .comment('Код подтверждения');

        table.boolean('is_activated').index('is_activated')
            .comment('Статус активации кода');

        table.dateTime('activated_at').index('activated_at')
            .comment('Время активации кода');

        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');
            
        table.comment('Таблица SMS кодов пользователя');
        table.collate('utf8_bin');
    });
};

export const down = async (knex:any) => {
    const hasUserSmsCode = await knex.schema.hasTable('aa_user_sms_code');
    if (hasUserSmsCode) {
        // await knex.schema.dropTable('aa_user_sms_code');
    }

    return knex.schema;
};