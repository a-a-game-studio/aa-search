import * as Components from '@a-a-game-studio/aa-components/lib';
import * as System from '../../Namespace/System';


/** Сохранить данные о картинке */
export namespace FileV {

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function saveImg() {
        let rules = new Components.ModelRulesC();

        // логин
        rules.set(rules.tpl('fileBase64', true)
            .tplText('Файлв в Base64')
        );

        return rules;
    }
}
