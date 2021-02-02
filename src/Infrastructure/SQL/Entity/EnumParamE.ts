

// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';

/**
 * Описание потребления способности
 */
export interface EnumParamI{
	id?: number; // ID
	id_enum?: number; // ID
	k?: string; // Ключ
	name?: string; // Имя
	val?: number; // Значение
	descript?: string; // Описание 
	type?: string; // Тип
	arg1?: string; // Аргумент 1
	arg2?: string; // Аргумент 2
	arg3?: string; // Аргумент 3
}

/**
 * Свойство
 */
export class EnumParamE
{
    //Имя таблицы
    public static NAME = 'aa_enum_param';

    /**
     * Вставка ключевых записей таблицы
     */
	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('id_enum')
            .type(ModelRulesT.int)
            .errorEx(EnumParamE.NAME+'.id_enum', 'id_enum - неверные данные')
        );

        return rules.get();
    }

    /**
     * Обновление ключевых записей таблицы
     */
	public getRulesUpdate(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('k')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.k', 'k - неверные данные')
        );

        rules.set(rules.rule('name')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.name', 'name - неверные данные')
        );

        rules.set(rules.rule('val')
            .type(ModelRulesT.int)
            .errorEx(EnumParamE.NAME+'.val', 'val - неверные данные')
        );

        rules.set(rules.rule('descript')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.descript', 'descript - неверные данные')
        );

        rules.set(rules.rule('type')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.type', 'type - неверные данные')
        );

        rules.set(rules.rule('arg1')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.arg1', 'arg1 - неверные данные')
        );

        rules.set(rules.rule('arg2')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.arg2', 'arg2 - неверные данные')
        );

        rules.set(rules.rule('arg3')
            .type(ModelRulesT.text)
            .errorEx(EnumParamE.NAME+'.arg3', 'arg3 - неверные данные')
        );

        return rules.get();
    }

}
