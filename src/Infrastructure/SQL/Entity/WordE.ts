// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';


/**
 * Описание словаря слов
 */
export interface WordI{
    id?:number; // ID
    word?:string; // Слова
    cnt?:number; // Количество
}


export class WordE
{
    //Имя таблицы
    public static NAME = 'word';

	public static getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('word')
            .type(ModelRulesT.text)
            .require()
            .error('login - неверный формат')
        );

        rules.set(rules.rule('cnt')
            .type(ModelRulesT.text)
            .require()
            .error('cnt - неверный формат')
        );

        return rules;
    }

    /** Правила обновления таблицы */
    public static getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('cnt')
            .typeInt()
            .error(WordE.NAME + ' - cnt')
        );

        return rules;
    }
}
