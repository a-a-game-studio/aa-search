
export const up = async function(knex:any, Promise:any) {
    const hasGroup = await knex.schema.hasTable('aa_group');

    if (hasGroup) {
        await knex.schema.dropTable('aa_group');
    }

    await knex.schema.createTable('aa_group', (table:any) => {
        table.increments('id');

        table.string('name', 100).index('name')
            .comment('Наименование группы пользователей');

        table.string('alias', 50).unique('alias')
            .notNullable()
            .comment('Псевдоним группы');

        table.text('descript')
            .comment('Описание группы пользователей');

        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');
            
        table.comment('Таблица с описаие групп пользователей');
        table.collate('utf8_bin');
    });

    await knex('aa_group')
        .insert([
            {
                name: 'Группа супер пользователь',
                alias: 'root',
                descript: 'Владелец системы',
            },
            {
                name: 'Группы администраторов',
                alias: 'admin',
                descript: 'Администраторы сайта',
            },
            {
                name: 'Группа пользователей',
                alias: 'user',
                descript: 'Пользователи сайта',
            },
        ])
    ;
};

export const down = async (knex:any) => {
    const hasUser = await knex.schema.hasTable('aa_group');
    if (hasUser) {
        // await knex.schema.dropTable('aa_group');
    }

    return knex.schema;
};