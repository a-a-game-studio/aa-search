
import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from '../../System/MainRequest';

/** Проверка входных данных */
export namespace EngineV {

    // =======================================================
    /**
     * Вставка данных
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

    // =======================================================
    /**
     * Вставка данных
     */
     export function search() {
        let rules = new Components.ModelRulesC();

        // ---------------------------------------

        // Сколько записей получать
        rules.set(rules.rule('table')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('table', 'table')
        );

        rules.set(rules.rule('search')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('search', 'search')
        );

        rules.set(rules.rule('where')
            .type(Components.ModelRulesT.text)
            .errorEx('where', 'where')
        );

        rules.set(rules.rule('limit')
            .type(Components.ModelRulesT.int)
            .errorEx('limit', 'limit')
        );

        rules.set(rules.rule('page')
            .type(Components.ModelRulesT.int)
            .errorEx('page', 'page')
        );
        
        rules.set(rules.rule('ix_column_weight')
            .type(Components.ModelRulesT.object)
            .errorEx('ix_column_weight', 'ix_column_weight')
        );

        rules.set(rules.rule('exact_word_weight')
            .type(Components.ModelRulesT.int)
            .errorEx('exact_word_weight', 'exact_word_weight')
        );

        

        // ---------------------------------------

        return rules;
    }

}