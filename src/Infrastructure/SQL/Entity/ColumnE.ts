// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';

export enum ColumnT {
    bool = 1,
    int = 2,
    str = 3,
    text = 4,
    date = 5,
    datetime = 6,
    time = 7,
    decimal = 8,
    uid = 9,
    json = 10
}

/**
 * Описание словаря слов
 */
export interface ColumnI {
    id?:number; // ID
    id_table?: number; // ID таблицы
    name?:string; // наименование колонки
    type?:ColumnT; // Тип колонки
}

export class ColumnE
{
    //Имя таблицы
    public static NAME = 'column';

	public static getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('id_table')
            .typeInt()
            .require()
            .more(0)
            .errorEx(ColumnE.NAME+'.id_table', 'id_table - неверный формат')
        );

        rules.set(rules.rule('name')
            .typeText()
            .require()
            .errorEx(ColumnE.NAME+'.name', 'name - неверный формат')
        );

        rules.set(rules.rule('type')
            .typeEnum()
            .if(Object.values(ColumnT))
            .require()
            .errorEx(ColumnE.NAME+'.type', 'type - неверный формат')
        );

        return rules;
    }

    /** Правила обновления таблицы */
    public static getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('name')
            .typeText()
            .errorEx(ColumnE.NAME+'.name', 'name - неверный формат')
        );

        rules.set(rules.rule('type')
            .typeEnum()
            .if(Object.values(ColumnT))
            .errorEx(ColumnE.NAME+'.name', 'name - неверный формат')
        );

        return rules;
    }
}
