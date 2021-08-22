// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';


/**
 * Описание словаря слов
 */
export interface IxI{
    id?:number; // ID
    column?:number; // колонка таблицы
    id_word?: number; // ID слова
    cnt?:number; // Количество совпадений в колонке
}


export class IxE
{
    //Имя таблицы
    public static NAME = 'ix_';

	public static getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('column')
            .type(ModelRulesT.int)
            .require()
            .error('column - неверный формат')
        );

        rules.set(rules.rule('id_word')
            .type(ModelRulesT.int)
            .require()
            .error('id_word - неверный формат')
        );

        rules.set(rules.rule('cnt')
            .type(ModelRulesT.int)
            .require()
            .error('cnt - неверный формат')
        );

        return rules;
    }

    /** Правила обновления таблицы */
    public static getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        return rules;
    }
}
