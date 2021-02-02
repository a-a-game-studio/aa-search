

// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';


export class UserSmsCodeE
{
    //Имя таблицы
    public static NAME = 'aa_user_sms_code';

	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .error(UserSmsCodeE.NAME+'.id_user')
        );

        rules.set(rules.rule('code')
            .type(Components.ModelRulesT.text)
            .error(UserSmsCodeE.NAME+'.code')
        );

        return rules.get();
    }
}
