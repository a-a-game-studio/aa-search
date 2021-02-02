
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../Namespace/System';
import { GroupI } from '../../Infrastructure/SQL/Entity/GroupE';
import { System } from '../..';
import { UserGroupI } from '../../Infrastructure/SQL/Entity/UserGroupE';


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

    // Проверка с какой записи получать данные
    rules.set(rules.rule('offset')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('offset', 'offset')
    );

    // Сколько записей получать
    rules.set(rules.rule('limit')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .lessOrEq(100)
        .errorEx('limit', 'limit')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}



// =======================================================
/**
 * Выбрать пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function selectUser(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // Сколько записей получать
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_user', 'id_user')
    );

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

    // ID Группа пользователей
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
 * Добавить пользователя к группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addUserToGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_user', 'id_user')
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
 * Удалить пользователя из группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function delUserFromGroup(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_user', 'id_user')
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
 * Добавить пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addUser(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // логин
    rules.set(rules.rule('login')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('login', 'login')
    );

    // логин
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // пароль
    rules.set(rules.rule('pswd')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(6)
        .maxLen(100)
        .errorEx('pswd', 'pswd')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}



// =======================================================
/**
 * Удалить пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function delUser(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_user', 'id_user')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


/**
 * Сохранить данные о пользователе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function saveUser(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_user')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_user', 'id_user')
    );

    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // email
    rules.set(rules.rule('email')
        .type(Components.ModelRulesT.str)
        .if('.+@.+\..+')
        .minLen(3)
        .maxLen(100)
        .errorEx('email', 'email')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}
