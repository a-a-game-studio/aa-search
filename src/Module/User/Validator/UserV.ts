
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import * as System from '../../../Namespace/System';

// =======================================================
/** Получить информацию о себе */
export namespace getSelfUserInfo {

    /** Параметры api запроса */
    export interface RequestI {
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user_info: UserI; // пользователь
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

// =======================================================
/** Получить информацию о пользователе */
export namespace getUserInfo {

    /** Параметры api запроса */
    export interface RequestI {
        id_user:number; // ID пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_user_info: UserI; // пользователь
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // Проверка с какой записи получать данные
        rules.set(rules.rule('id_user')
            .type(Components.ModelRulesT.int)
            .require()
            .more(0)
            .errorEx('id_user', 'id_user')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

/** Сохранить данные о пользователе */
export namespace save {

    /** Параметры api запроса */
    export interface RequestI {
        id_user:number; // email
        name:string; // Пароль
        surname:string; // Фамилия
        patronymic:string; // Отчество
        email:string; // Изменить email
    }

    /** Параметры api ответа */
    export interface ResponseI {
        save_user:boolean; // команда сохранения пользователя
        one_user: UserI; // пользователь
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // логин
        rules.set(rules.rule('login')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(100)
            .errorEx('login', 'login')
        );

        // email
        rules.set(rules.rule('email')
            .type(Components.ModelRulesT.str)
            .require()
            .if('.+@.+\..+')
            .minLen(3)
            .maxLen(100)
            .errorEx('email', 'email')
        );

        // пароль
        rules.set(rules.rule('pswd')
            .type(Components.ModelRulesT.text)
            .require()
            .minLen(6)
            .maxLen(100)
            .errorEx('pswd', 'pswd')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}
