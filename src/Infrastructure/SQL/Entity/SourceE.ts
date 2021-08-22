// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';


/**
 * Описание словаря слов
 */
export interface SourceI{
    source_id?:number; // ID
    [key:string]:any;
}


export class SourceE
{
    //Имя таблицы
    public static NAME = 'source_';

	public static getRulesInsert(){
        let rules = new Components.ModelRulesC();

        return rules;
    }

    /** Правила обновления таблицы */
    public static getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        return rules;
    }
}
