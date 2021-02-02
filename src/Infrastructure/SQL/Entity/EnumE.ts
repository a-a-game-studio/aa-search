

// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';

/**
 * Описание потребления способности
 */
export interface EnumI{
	id?: number; // ID
	k?: string; // Ключ
	name?: string; // Имя
	descript?: string; // описание
	path1?: string; // 1 путь
	path2?: string; // 2 путь
	path3?: string; // 3 путь
}

/**
 * Список свойств
 */
export class EnumE
{
    //Имя таблицы
    public static NAME = 'aa_enum';

    /**
     * Вставка ключевых записей таблицы
     */
	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        return rules.get();
    }

    /**
     * Обновление ключевых записей таблицы
     */
	public getRulesUpdate(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('k')
            .type(ModelRulesT.text)
            .errorEx(EnumE.NAME+'.k', 'k - неверные данные')
        );

        rules.set(rules.rule('name')
            .type(ModelRulesT.text)
            .errorEx(EnumE.NAME+'.name', 'name - неверные данные')
        );

        rules.set(rules.rule('descript')
            .type(ModelRulesT.text)
            .errorEx(EnumE.NAME+'.descript', 'descript - неверные данные')
        );

        rules.set(rules.rule('path1')
            .type(ModelRulesT.text)
            .errorEx(EnumE.NAME+'.path1', 'path1 - неверные данные')
        );

        rules.set(rules.rule('path2')
            .type(ModelRulesT.text)
            .errorEx(EnumE.NAME+'.path2', 'path2 - неверные данные')
        );

        rules.set(rules.rule('path3')
            .type(ModelRulesT.text)
            .errorEx(EnumE.NAME+'.path3', 'path3 - неверные данные')
        );

        return rules.get();
    }

}


