
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
        rules.set(rules.rule('table')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('table', 'table')
        );

        rules.set(rules.rule('list_row')
            .type(Components.ModelRulesT.array)
            .require()
            .errorEx('list_row', 'list_row')
        );

        // ---------------------------------------

        return rules;
    }

    /** Создать таблицу */
     export function createTable() {
        let rules = new Components.ModelRulesC();

        // Сколько записей получать
        rules.set(rules.rule('table')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('table', 'table')
        );

        rules.set(rules.rule('list_column')
            .type(Components.ModelRulesT.array)
            .require()
            .errorEx('list_column', 'list_column')
        );

        return rules;
    }

    /** Удалить таблицу */
    export function delTable() {
        let rules = new Components.ModelRulesC();

        // Сколько записей получать
        rules.set(rules.rule('table')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('table', 'table')
        );

        return rules;
    }

    /** Очистить таблицу */
    export function clearTable() {
        let rules = new Components.ModelRulesC();

        // Сколько записей получать
        rules.set(rules.rule('table')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('table', 'table')
        );

        return rules;
    }

}