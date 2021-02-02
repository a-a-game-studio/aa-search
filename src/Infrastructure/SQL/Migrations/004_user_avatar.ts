export const up = async function (knex:any, Promise:any) {
    const bHasTable = await knex.schema.hasTable('aa_user_avatar');
    
    if (bHasTable) {
        await knex.schema.dropTable('aa_user_avatar');
    }

    await knex.schema.createTable('aa_user_avatar', (table:any) => {
        table.increments('id');

        table.integer('id_user').index('id_user')
            .comment('ID пользователя');

        table.string('filename', 1024)
            .comment('filename - имя файла');

        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.comment('Аватарка пользователя');
        table.collate('utf8_bin');
    });

};

export const down = async (knex:any) => {
    const bHasTable = await knex.schema.hasTable('aa_user_avatar');
    if (bHasTable) {
        await knex.schema.dropTable('aa_user_avatar');
    }

    return knex.schema;
};