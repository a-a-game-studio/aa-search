
// Системные классы
import BaseM from '../../System/BaseM';

// Классы SQL Запросов
import { CtrlAccessSQL } from '../../Infrastructure/SQL/Repository/CtrlAccessSQL';
import { AccessGroupSQL } from '../../Infrastructure/SQL/Repository/AccessGroupSQL';

// Routing
import {AdminEditGroupR} from './AdminEditGroupR';
import R = AdminEditGroupR;

import * as V from './AdminEditGroupV';

// Интерфейсы и сущьности
import { CtrlAccessI } from '../../Infrastructure/SQL/Entity/CtrlAccessE';
import { AccessGroupI } from '../../Infrastructure/SQL/Entity/AccessGroupE';
import { GroupSQL } from '../../Infrastructure/SQL/Repository/GroupSQL';
import { GroupI } from '../../Infrastructure/SQL/Entity/GroupE';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class AdminEditGroupM extends BaseM
{

    private ctrlAccessSQL: CtrlAccessSQL;
    private groupSQL: GroupSQL;
    private accessGroupSQL: AccessGroupSQL;

    constructor(req:any) {
        super(req);

        this.ctrlAccessSQL = new CtrlAccessSQL(req);
        this.groupSQL = new GroupSQL(req);
        this.accessGroupSQL = new AccessGroupSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async init(data:R.init.RequestI): Promise<R.init.ResponseI> {

        data = <R.init.RequestI>V.init(this.req, data);    

        let ok = this.errorSys.isOk();

        let aAccessCtrlList = null;
        if (ok) { // Получить список пользователей
            aAccessCtrlList = await this.ctrlAccessSQL.getAllCtrlAccess();
        }

        let aGroupList = null;
        if (ok) { // Получить список пользователей
            aGroupList = await this.groupSQL.getAllGroups();
        }

        let out:R.init.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                is_init:true,
                list_ctrl_access:aAccessCtrlList, // Список пользователей
                list_group:aGroupList // Список всех групп
            };
        }

        return out;
    }

    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    public async selectGroup(data:R.selectGroup.RequestI): Promise<R.selectGroup.ResponseI> {

        data = <R.selectGroup.RequestI>V.selectGroup(this.req, data);

        let idGroup = data.id_group;

        let vGroup:GroupI = null;
        await this.logicSys.ifOk('Получить список групп', async () => {
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        });

        let aAccessGroups:AccessGroupI[] = null;
        await this.logicSys.ifOk('Получить список ролей пользователя', async () => {
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        });

        let out:R.selectGroup.ResponseI = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_group:vGroup,
                list_access_group:aAccessGroups
            };
        });

        return out;
    }

    // =======================================

    /**
     * Выбрать контроллер доступа
     *
     * @param array data
     * @return array|null
     */
    public async selectCtrlAccess(data:R.selectCtrlAccess.RequestI): Promise<R.selectCtrlAccess.ResponseI> {

        data = <R.selectCtrlAccess.RequestI>V.selectCtrlAccess(this.req, data);

        let idCtrlAccess = data.id_ctrl_access;

        let oneCtrlAccess:CtrlAccessI = null;
        await this.logicSys.ifOk('Получить список ролей пользователя', async () => {
            oneCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idCtrlAccess);
        });

        let out:R.selectCtrlAccess.ResponseI = null;
        this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_ctrl_access:oneCtrlAccess
            }
        });

        return out;
    }

    /**
     * Добавить добавить контроллер доступа группе
     *
     * @param array data
     */
    public async addCtrlAccessToGroup(data:R.addCtrlAccessToGroup.RequestI): Promise<R.addCtrlAccessToGroup.ResponseI> {

        data = <R.addCtrlAccessToGroup.RequestI>V.addCtrlAccessToGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;

        let idAddCtrlAccessToGroup = 0; // ID Связи между контроллером доступа и группой
        if (ok) { // Дать права группе на контроллер/модуль
            idAddCtrlAccessToGroup = await this.accessGroupSQL.addCtrlAccessToGroup(idCtrlAccess, idGroup);
        }

        let aAccessGroups:AccessGroupI[] = null;
        if (ok) { // Получить список модулей доступных группе
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }

        let out:R.addCtrlAccessToGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_ctrl_access_to_group:idAddCtrlAccessToGroup,
                list_access_group:aAccessGroups
            };
        }

        return out;
    }

    /**
     * Удалить права группы на контроллер/модуль
     *
     * @param array data
     */
    public async delCtrlAccessFromGroup(data:R.delCtrlAccessFromGroup.RequestI): Promise<R.delCtrlAccessFromGroup.ResponseI> {

        data = <R.delCtrlAccessFromGroup.RequestI>V.delCtrlAccessFromGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idCtrlAccess = data.id_ctrl_access;
        let idGroup = data.id_group;

        let bDelCtrlAccessFromGroup = false;
        if (ok) { // Удалить права на модуль у группы
            bDelCtrlAccessFromGroup = await this.accessGroupSQL.delCtrlAccessFromGroup(idCtrlAccess, idGroup);
        }

        let aAccessGroups:AccessGroupI[] = null;
        if (ok) { // Получить список модулей группы
            aAccessGroups = await this.accessGroupSQL.getCtrlAccessOfGroupByID(idGroup);
        }

        let out:R.delCtrlAccessFromGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_ctrl_access_from_group:bDelCtrlAccessFromGroup,
                list_access_group:aAccessGroups
            };
        }

        return out;
    }

    /**
     * Добавить группу пользователей
     * @param data 
     */
    public async addGroup(data:R.addGroup.RequestI): Promise<R.addGroup.ResponseI> {

        data = <R.addGroup.RequestI>V.addGroup(this.req, data);

        let ok = this.errorSys.isOk();

        // --------------------------

        let idGroup:number = null;
        if(ok){ // Регистрируем пользователя
            idGroup = await this.groupSQL.addGroup(data);
            if(!idGroup){
                this.errorSys.error('add_group', 'Не удалось создать группу');
            }
        }

        // --------------------------

        let listGroup:GroupI[] = null;
        if(ok){ // Получить список групп
            listGroup = await this.groupSQL.getAllGroups();
        }

        // --------------------------

        let vGroup:GroupI = null;
        if (ok) { // Получить список пользователей
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        // --------------------------

        let out:R.addGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_group:idGroup, 
                one_group:vGroup,
                list_group:listGroup // Список пользователей
            };
        }

        return out;
    }

    /**
     * Сохранить группу
     * @param data данные
     */
    public async saveGroup(data:R.saveGroup.RequestI): Promise<R.saveGroup.ResponseI> {

        data = <R.saveGroup.RequestI>V.saveGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.id_group;

        let bSaveGroup = false;
        if(ok){ // Сохранить группу
            bSaveGroup = await this.groupSQL.saveGroup(idGroup, data);
        }

        // --------------------------

        let vGroup:GroupI = null;
        if (ok) { // Получить информация по группу
            vGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        // --------------------------

        let listGroup:GroupI[] = null;
        if(ok){ // Получить список групп
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------

        let out:R.saveGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                save_group:bSaveGroup, // Подтверждение регистрации
                one_group:vGroup, // Измененный пользователь
                list_group:listGroup // Список пользователей
            };
        }

        return out;
    }

    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    public async saveCtrlAccess(data:R.saveCtrlAccess.RequestI): Promise<R.saveCtrlAccess.ResponseI> {

        data = <R.saveCtrlAccess.RequestI>V.saveGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idCtrlAccess = data.id_ctrl_access;

        let bSaveCtrlAccess = false;
        if(ok){ // Сохранить группу
            bSaveCtrlAccess = await this.ctrlAccessSQL.saveCtrlAccess(idCtrlAccess, data);
        }

        // --------------------------

        let vCtrlAccess:CtrlAccessI = null;
        if (ok) { // Получить информация по группу
            vCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idCtrlAccess);
        }

        // --------------------------

        let listCtrlAccess:GroupI[] = null;
        if(ok){ // Получить список групп
            listCtrlAccess = await this.ctrlAccessSQL.getAllCtrlAccess();
        }
        // --------------------------

        let out:R.saveCtrlAccess.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                save_ctrl_access:bSaveCtrlAccess, // статус команды
                one_ctrl_access:vCtrlAccess, // Измененный пользователь
                list_ctrl_access:listCtrlAccess // Список пользователей
            };
        }

        return out;
    }

    /**
     * Удалить группу
     * @param data 
     */
    public async delGroup(data:R.delGroup.RequestI): Promise<R.delGroup.ResponseI> {

        data = <R.delGroup.RequestI>V.delGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.id_group;

        let bDelGroup = false;
        if(ok){ // Подтвердить регистрацию
            bDelGroup = await this.groupSQL.delGroupByID(idGroup);
        }

        // --------------------------

        let listGroup:GroupI[] = null;
        if(ok){ // Получить список пользователей
            listGroup = await this.groupSQL.getAllGroups();
        }
        // --------------------------

        let out:R.delGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_group:bDelGroup, // Подтверждение регистрации
                list_group:listGroup // Список пользователей
            };
        }

        return out;
    }

    /**
     * Добавить группу пользователей
     * @param data 
     */
    public async addCtrlAccess(data:R.addCtrlAccess.RequestI): Promise<R.addCtrlAccess.ResponseI> {

        data = <R.addCtrlAccess.RequestI>V.addCtrlAccess(this.req, data);

        let ok = this.errorSys.isOk();

        // --------------------------

        let idGCtrlAccess:number = null;
        if(ok){ // Регистрируем пользователя
            idGCtrlAccess = await this.ctrlAccessSQL.addCtrlAccess(data);
            if(!idGCtrlAccess){
                this.errorSys.error('add_ctrl_access', 'Не удалось создать группу');
            }
        }

        // --------------------------

        let aCtrlAccess:CtrlAccessI[] = null;
        if(ok){ // Получить список групп
            aCtrlAccess = await this.ctrlAccessSQL.getAllCtrlAccess();
        }

        // --------------------------

        let vCtrlAccess:CtrlAccessI = null;
        if (ok) { // Получить список пользователей
            vCtrlAccess = await this.ctrlAccessSQL.getCtrlAccessByID(idGCtrlAccess);
        }

        // --------------------------

        let out:R.addCtrlAccess.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_ctrl_access:idGCtrlAccess, 
                one_ctrl_access:vCtrlAccess,
                list_ctrl_access:aCtrlAccess // Список контроллеров
            };
        }

        return out;
    }

}
