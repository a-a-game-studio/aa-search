// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';

export interface UserGroupI{
	uid_user_group?:number; // ID связи группы и пользователя
	id_user?: number; // ID пользователя
	id_group?: number; // ID группы
}

export class UserGroupE
{
    //Имя таблицы
    public static NAME = 'aa_user_group';

	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .error(UserGroupE.NAME+'.id_user')
        );

        rules.set(rules.rule('id_group')
            .type(Components.ModelRulesT.int)
            .error(UserGroupE.NAME+'.id_group')
        );

        return rules.get();
    }
}
