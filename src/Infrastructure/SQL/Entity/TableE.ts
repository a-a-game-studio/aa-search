// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';

/**
 * Описание словаря слов
 */
export interface TableI {
    id?:number; // ID
    name?:string; // Слова
}

export class TableE
{
    //Имя таблицы
    public static NAME = 'table';

	public static getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('name')
            .typeText()
            .require()
            .errorEx(TableE.NAME+'.name', 'name - неверный формат')
        );

        return rules;
    }

    /** Правила обновления таблицы */
    public static getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('name')
            .typeText()
            .errorEx(TableE.NAME+'.name','name - неверный формат')
        );

        return rules;
    }
}
