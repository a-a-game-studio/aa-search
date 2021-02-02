
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
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function getEnumTreeType(req: System.MainRequest, data: any) {
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
export function selectEnum(req: System.MainRequest, data: any) {
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
export function selectEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum_param', 'id_enum_param')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Добавить enum
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

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
export function addEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum', 'id_enum')
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
export function delEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID группы
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum')
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
export function delEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID enum
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum')
    );

    // ID enum param
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param')
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
export function saveEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_enum', 'id_enum')
    );

    // Псевдоним
    rules.set(rules.rule('k')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('k', 'k')
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

    // path1
    rules.set(rules.rule('path1')
        .type(Components.ModelRulesT.text)
        .minLen(1)
        .maxLen(50)
        .errorEx('path1', 'path1')
    );

    // path2
    rules.set(rules.rule('path2')
        .type(Components.ModelRulesT.text)
        .minLen(1)
        .maxLen(50)
        .errorEx('path2', 'path2')
    );

    // path3
    rules.set(rules.rule('path3')
        .type(Components.ModelRulesT.text)
        .minLen(1)
        .maxLen(50)
        .errorEx('path3', 'path3')
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
export function saveEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID enum параметра
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param')
    );

    // KEY
    rules.set(rules.rule('k')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('k', 'k')
    );

    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // type
    rules.set(rules.rule('type')
        .type(Components.ModelRulesT.text)
        .errorEx('type', 'type')
    );

    // val
    rules.set(rules.rule('val')
        .type(Components.ModelRulesT.int)
        .errorEx('val', 'val')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // arg1
    rules.set(rules.rule('arg1')
        .type(Components.ModelRulesT.text)
        .errorEx('arg1', 'arg1')
    );

    // arg2
    rules.set(rules.rule('arg2')
        .type(Components.ModelRulesT.text)
        .errorEx('arg2', 'arg2')
    );

    // arg3
    rules.set(rules.rule('arg3')
        .type(Components.ModelRulesT.text)
        .errorEx('arg3', 'arg3')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}
