export const up = async function(knex:any, Promise:any) {
    const hasAccessGroup = await knex.schema.hasTable('aa_access_group');

    if (hasAccessGroup) {
        await knex.schema.dropTable('aa_access_group');
    }

    await knex.schema.createTable('aa_access_group', (table:any) => {
        table.increments('id');

        table.integer('id_group').index('id_group')
            .comment('ID группы');

        table.integer('id_ctrl_access').index('id_ctrl_access')
            .comment('ID контроллера');

        table.boolean('create_access').index('create_access')
            .defaultTo(0)
            .comment('Права на создание');

        table.boolean('read_access').index('read_access')
            .defaultTo(0)
            .comment('Права на чтение');

        table.boolean('update_access').index('update_access')
            .defaultTo(0)
            .comment('Права на обновление');

        table.boolean('delete_access').index('delete_access')
            .defaultTo(0)
            .comment('Права на удаление');

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

    await knex('aa_access_group')
        .insert([
            {
                id_group: 1,
                id_ctrl_access: 1,
                create_access: 1,
                read_access: 1,
                update_access: 1,
                delete_access: 1,
            },
            {
                id_group: 1,
                id_ctrl_access: 2,
                create_access: 1,
                read_access: 1,
                update_access: 1,
                delete_access: 1,
            },
        ])
    ;
    
};

export const down = async (knex:any) => {
    const hasAccessGroup = await knex.schema.hasTable('aa_access_group');
    if (hasAccessGroup) {
        // await knex.schema.dropTable('aa_access_group');
    }

    return knex.schema;
};