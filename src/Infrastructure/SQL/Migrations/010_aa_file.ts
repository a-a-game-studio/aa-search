
export const up = async function (knex: any, Promise: any) {

    let has = await knex.schema.hasTable('aa_file');

    if (has) {
        await knex.schema.dropTable('aa_file');
    }

    await knex.schema.createTable('aa_file', (table: any) => {
        table.increments('id');

        table.string('file_name', 32)
            .unique('file_name')
            .comment('Отображаемое имя');


        table.comment('Таблица файлы');
        table.collate('utf8_bin');
    });

    has = await knex.schema.hasTable('aa_img');

    if (has) {
        await knex.schema.dropTable('aa_img');
    }

    await knex.schema.createTable('aa_img', (table: any) => {
        table.increments('id');

        table.string('file_name', 32)
            .unique('file_name')
            .comment('Имя файла');


        table.string('f_320', 32)
            .unique('f_320')
            .comment('Имя файла');

        table.string('f_800', 32)
            .unique('f_800')
            .comment('Имя файла');

        table.string('а_1024', 32)
            .unique('а_1024')
            .comment('Имя файла');


        table.comment('Таблица файлы');
        table.collate('utf8_bin');
    });

    let idFileModule = (await knex('aa_ctrl_access')
        .insert([
            {
                name: 'Загрузка файлов',
                alias: 'file-module',
                descript: '',
                created_at: knex.fn.now(),
            },
        ])
    )[0];

    await knex('aa_access_group')
    .insert([
        {
            id_group: 1,
            id_ctrl_access: idFileModule,
            create_access: 1,
            read_access: 1,
            update_access: 1,
            delete_access: 1
        }
    ]);

    return knex.schema;

};

export const down = async (knex: any) => {

    return knex.schema;
};