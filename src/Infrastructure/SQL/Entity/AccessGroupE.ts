
// Системные сервисы
import { UserSys } from '../../../System/UserSys';

import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';



/**
 * Описание полей группы
 */
export interface AccessGroupI {
    id?: number; // ID доступа
    id_group?: number; //ID группы
    id_ctrl_access?: number; // ID контроллера
    create_access?: boolean; // Права на создание
    read_access?: boolean; // Права на чтение
    update_access?: boolean; // Права на обновление
    delete_access?: boolean; // Права на удаление
}

/**
 * Сущьность доступа группе пользователей
 */
export class AccessGroupE {
    //Имя таблицы
    public static NAME = 'aa_access_group';

    /**
     * Обновление ключевых записей таблицы
     */
    public getRulesUpdate() {
        let rules = new Components.ModelRulesC();


        rules.set(rules.rule('create_access')
            .type(ModelRulesT.boolean)
            .error('create_access - неверный формат')
        );

        rules.set(rules.rule('read_access')
            .type(ModelRulesT.boolean)
            .error('read_access - неверный формат')
        );

        rules.set(rules.rule('update_access')
            .type(ModelRulesT.boolean)
            .error('update_access - неверный формат')
        );

        rules.set(rules.rule('delete_access')
            .type(ModelRulesT.boolean)
            .error('delete_access - неверный формат')
        );

        return rules.get();
    }

    /**
     *  Правила создания записей в таблице
     */
    public getRulesInsert() {
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('id_group')
            .type(ModelRulesT.int)
            .error('id_group - неверный формат')
        );

        rules.set(rules.rule('id_ctrl_access')
            .type(ModelRulesT.int)
            .error('id_ctrl_access - неверный формат')
        );

        return rules.get();
    }

}
