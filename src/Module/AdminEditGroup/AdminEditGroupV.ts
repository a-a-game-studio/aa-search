
import * as Components from '@a-a-game-studio/aa-components/lib';
import { System } from '../..';

// =======================================================
/**
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function init(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Выбрать группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function selectGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // Сколько записей получать
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_group', 'id_group')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Выбрать контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function selectCtrlAccess(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_ctrl_access')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_ctrl_access', 'id_ctrl_access')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Добавить права группе на контроллер
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addCtrlAccessToGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_ctrl_access')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_ctrl_access', 'id_ctrl_access')
    );

    // ID группы
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_group', 'id_group')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Удалить права на контроллер у группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function delCtrlAccessFromGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_ctrl_access')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_ctrl_access', 'id_ctrl_access')
    );

    // ID группы
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_group', 'id_group')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


// =======================================================
/**
 * Добавить группу пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // псевдоним
    rules.set(rules.rule('alias')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('alias', 'alias')
    );

    // Наименование
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(6)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


// =======================================================
/**
 * Добавить группу контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addCtrlAccess(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // псевдоним
    rules.set(rules.rule('alias')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('alias', 'alias')
    );

    // Наименование
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(6)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Удалить группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function delGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID группы
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_group', 'id_group')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


// =======================================================
/**
 * Сохранить данные о группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function saveGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_group')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_group', 'id_group')
    );

    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

/**
 * Сохранить контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function saveCtrlAccess(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_ctrl_access')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_ctrl_access', 'id_ctrl_access')
    );

    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}
