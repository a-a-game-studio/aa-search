// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';


/**
 * Описание словаря слов
 */
export interface LetterI{
    id?:number; // ID
    id_word?:number; // ID слова
    code?:number; // код пары символов
}


export class LetterE
{
    //Имя таблицы
    public static NAME = 'letter';

	public static getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('id_word')
            .type(ModelRulesT.int)
            .require()
            .error('id_word - неверный формат')
        );

        rules.set(rules.rule('code')
            .type(ModelRulesT.int)
            .require()
            .error('code - неверный формат')
        );

        return rules;
    }

    /** Правила обновления таблицы */
    public static getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        return rules;
    }
}
