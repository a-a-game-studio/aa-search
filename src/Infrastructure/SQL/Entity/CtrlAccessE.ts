// Системные сервисы
import {UserSys} from '../../../System/UserSys';


// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';

/**
 * Описание полей пользователя
 */
export interface CtrlAccessI{
    id?:number;
    alias?:string;
    name?:string;
    descript?:string;
}


export class CtrlAccessE
{
    //Имя таблицы
    public static NAME = 'aa_ctrl_access';

    /**
     * Обновление ключевых записей таблицы
     */
	public getRulesUpdate(){
        let rules = new Components.ModelRulesC();


        rules.set(rules.rule('alias')
            .type(ModelRulesT.text)
            .error('alias - неверный формат')
        );

        rules.set(rules.rule('name')
            .type(ModelRulesT.text)
            .error('name - неверный формат')
        );

        rules.set(rules.rule('descript')
            .type(ModelRulesT.text)
            .error('descript - неверный формат')
        );

        return rules.get();
    }

    /**
     *  Правила создания записей в таблице
     */
	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .error('alias - неверный формат')
        );

        rules.set(rules.rule('name')
            .type(Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .error('alias - неверный формат')
        );

        rules.set(rules.rule('descript')
            .type(Components.ModelRulesT.text)
            .error('alias - неверный формат')
        );

        return rules.get();
    }

    	// return [
		// 	'refund_tpl_name' : ['str', "/^[0-9a-zA-Zа-яА-Я ]{2,30}/u", true, false, 'refund_tpl_name неверный формат'],
		// 	'id_user' : [ModelRulesT.int, "/^[0-9]{1,11}/", true, false, 'id_user не верный формат'],
		// 	'refund_money' : [ModelRulesT.int, "/^[0-9]{1,11}/", false, false, 'refund_money неверный формат'],
		// 	'refund_type' : ['enum', ['card', 'account'], true, false, 'refund_type неверный формат'],

		// 	'refund_card' : ['str', "/^[0-9]{16,18}/", false, ['refund_type':'card'], 'refund_card неверный формат'],

		// 	'refund_card_account' : ['str', "/^[0-9]{20}/", false, ['refund_type':'account'], 'refund_card_account неверный формат'],
		// 	'refund_bik' : ['str', "/^[0-9]{9,9}/", false, ['refund_type':'account'], 'refund_bik неверный формат'],
		// 	'refund_inn' : ['str', "/^[0-9]{10,10}/", false, ['refund_type':'account'], 'refund_inn неверный формат'],
		// 	'refund_kpp' : ['str', "/^[0-9]{9,9}/", false, ['refund_type':'account'], 'refund_kpp неверный формат'],

		// 	'refund_firstname' : ['str', "/^[а-яА-Я]{2,30}/u", false, false, 'refund_firstname неверный формат'],
		// 	'refund_lastname' : ['str', "/^[а-яА-Я]{2,30}/u", false, false, 'refund_lastname неверный формат'],
		// 	'refund_fathername' : ['str', "/^[а-яА-Я]{2,30}/u", false, false, 'refund_fathername неверный формат'],
		// 	'refund_fullname' : [ModelRulesT.text, false, false, false, 'refund_fullname неверный формат'],

		// 	'refund_reason' : [ModelRulesT.text, false, false, false, 'refund_reason неверный формат'],
		// ];


}
