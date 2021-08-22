
import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from '../../System/MainRequest';

/** Проверка входных данных */
export namespace EngineV {

    // =======================================================
    /**
     * Вставка данных
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function insert() {
        let rules = new Components.ModelRulesC();

        // ---------------------------------------

        // Сколько записей получать
        rules.set(rules.rule('id_enum')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('id_enum', 'id_enum')
        );

        // ---------------------------------------

        return rules;
    }

}