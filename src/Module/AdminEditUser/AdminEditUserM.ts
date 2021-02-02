
// Системные классы
import BaseM from '../../System/BaseM';

// Классы SQL Запросов
import { UserSQL } from '../../Infrastructure/SQL/Repository/UserSQL';
import { UserGroupSQL } from '../../Infrastructure/SQL/Repository/UserGroupSQL';

// Роутинг
import {AdminEditUserR} from './AdminEditUserR';
import R = AdminEditUserR;

// Валидация
import * as V from './AdminEditUserV'

// Интерфейсы и сущьности
import { UserI, UserIDs } from '../../Infrastructure/SQL/Entity/UserE';
import { UserGroupI } from '../../Infrastructure/SQL/Entity/UserGroupE';
import { GroupSQL } from '../../Infrastructure/SQL/Repository/GroupSQL';
import { GroupI } from '../../Infrastructure/SQL/Entity/GroupE';

/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
export class AdminEditUserM extends BaseM
{

    private userSQL: UserSQL;
    private groupSQL: GroupSQL;
    private userGroupSQL: UserGroupSQL;

    constructor(req:any) {
        super(req);

        this.userSQL = new UserSQL(req);
        this.groupSQL = new GroupSQL(req);
        this.userGroupSQL = new UserGroupSQL(req);
    }


    /**
     * Получить стартовые данные для работы страницы
     * @param data 
     */
    public async init(data:R.init.RequestI): Promise<R.init.ResponseI> {

        data = <R.init.RequestI>V.init(this.req, data);    

        let ok = this.errorSys.isOk();


        let iOffset = data.offset;

        let iLimit = data.limit;

        
        let aFilter:{
            search_surname?:string; // ФИО пользователя
            search_username?:string; // Имя пользователя
        } = {};
        if (ok) { // Формируем параметры фильтрации
            if (data.search_surname) {
                aFilter.search_surname = data.search_surname;
            } else {
                this.errorSys.devNotice('search_surname', 'Поиск по ФИО отсутствует');
            }

            if (data.search_username) {
                aFilter.search_username = data.search_username;
            } else {
                this.errorSys.devNotice('search_username', 'Поиск по логину отсутствует');
            }
        }

        let aUserList = null;
        if (ok) { // Получить список пользователей
            aUserList = await this.userSQL.getUserList(iOffset, iLimit, aFilter);
        }

        let aGroupList = null;
        if (ok) { // Получить список пользователей
            aGroupList = await this.groupSQL.getAllGroups();
        }

        let out:R.init.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                is_init:true,
                count_user:100,
                list_user:aUserList, // Список пользователей
                list_group:aGroupList // Список всех групп
            };
        }

        return out;
    }

    /**
     * Выбрать пользователя
     *
     * @param array data
     * @return array|null
     */
    public async selectUser(data:R.selectUser.RequestI): Promise<R.selectUser.ResponseI> {

        data = <R.selectUser.RequestI>V.selectUser(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }

        let aUserGroups:UserGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }

        let out:R.selectUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_user:vUser,
                list_user_group:aUserGroups
            };
        }

        return out;
    }

    // =======================================

    /**
     * Выбрать группу
     *
     * @param array data
     * @return array|null
     */
    public async selectGroup(data:R.selectGroup.RequestI): Promise<R.selectGroup.ResponseI> {

        data = <R.selectGroup.RequestI>V.selectGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idGroup = data.id_group;

        let oneGroup:GroupI = null;
        if (ok) { // Получить список ролей пользователя
            oneGroup = await this.groupSQL.getGroupByID(idGroup);
        }

        let out:R.selectGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                one_group:oneGroup
            }
        }

        return out;
    }

    /**
     * Добавить пользователя в группу - Добавить Роль
     *
     * @param array data
     * @return array|null
     */
    public async addUserToGroup(data:R.addUserToGroup.RequestI): Promise<R.addUserToGroup.ResponseI> {

        data = <R.addUserToGroup.RequestI>V.addUserToGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;
        let idGroup = data.id_group;

        let idAddUserToGroup = 0; // ID Связи между пользователем и группой
        if (ok) { // Получить список ролей пользователя
            idAddUserToGroup = await this.userGroupSQL.addUserToGroup(idUser, idGroup);
        }

        let aUserGroups:UserGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }

        let out:R.addUserToGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_user_to_group:idAddUserToGroup,
                list_user_group:aUserGroups
            };
        }

        return out;
    }

    /**
     * Удалить пользователя из группы - Убрать Роль
     *
     * @param array data
     * @return array|null
     */
    public async delUserFromGroup(data:R.delUserFromGroup.RequestI): Promise<R.delUserFromGroup.ResponseI> {

        data = <R.delUserFromGroup.RequestI>V.delUserFromGroup(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;
        let idGroup = data.id_group;

        let bDelUserFromGroup = false;
        if (ok) { // Получить список ролей пользователя
            bDelUserFromGroup = await this.userGroupSQL.delUserFromGroup(idUser, idGroup);
        }

        let aUserGroups:UserGroupI[] = null;
        if (ok) { // Получить список ролей пользователя
            aUserGroups = await this.userGroupSQL.getUserGroupsByUserID(idUser);
        }

        let out:R.delUserFromGroup.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_user_from_group:bDelUserFromGroup,
                list_user_group:aUserGroups
            };
        }

        return out;
    }

    public async addUser(data:R.addUser.RequestI): Promise<R.addUser.ResponseI> {

        data = <R.addUser.RequestI>V.addUser(this.req, data);

        let ok = this.errorSys.isOk();

        // --------------------------

        let sToken:string = null;
        if(ok){ // Регистрируем пользователя
            sToken = await this.userSQL.faRegister(data);
            if(!sToken){
                this.errorSys.error('register', 'Не удалось зарегистрировать пользователя');
            }
        }

        // --------------------------

        let vUserIDs:UserIDs = null;
        if(ok){ // Получить идентификаторы пользователя
            vUserIDs = await this.userSQL.getUserIDsByToken(sToken);
            if(!vUserIDs){
                ok = false;
                this.errorSys.error('id_users', 'Не удалось получить идентификаторы пользователя');
            }
        }

        // --------------------------

        let bAddUser = false;
        if(ok){ // Подтвердить регистрацию
            bAddUser = await this.userSQL.faConfirmRegisterByID(vUserIDs.id);
            if(!bAddUser){
                ok = false;
                this.errorSys.error('confirm_user', 'Не удалось получить подтвердить регистрацию');
            }
        }

        // --------------------------

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }

        // --------------------------

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(vUserIDs.id);
        }

        // --------------------------

        let out:R.addUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                add_user:vUserIDs.id, 
                one_user:vUser,
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

        /**
     * 
     * @param data Удалить пользователя
     */
    public async saveUser(data:R.saveUser.RequestI): Promise<R.saveUser.ResponseI> {

        data = <R.saveUser.RequestI>V.saveUser(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;

        let bSaveUser = false;
        if(ok){ // Подтвердить регистрацию
            bSaveUser = await this.userSQL.faUpdate(idUser, data);
        }

        // --------------------------

        let vUser:UserI = null;
        if (ok) { // Получить список пользователей
            vUser = await this.userSQL.getUserByID(idUser);
        }

        // --------------------------

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }
        // --------------------------

        let out:R.saveUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                save_user:bSaveUser, // Подтверждение регистрации
                one_user:vUser, // Измененный пользователь
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

    /**
     * 
     * @param data Удалить пользователя
     */
    public async delUser(data:R.delUser.RequestI): Promise<R.delUser.ResponseI> {

        data = <R.delUser.RequestI>V.delUser(this.req, data);

        let ok = this.errorSys.isOk();

        let idUser = data.id_user;

        let bDelUser = false;
        if(ok){ // Подтвердить регистрацию
            bDelUser = await this.userSQL.faDelUser(idUser);
        }

        // --------------------------

        let listUser:UserI[] = null;
        if(ok){ // Получить список пользователей
            listUser = await this.userSQL.getUserList(0,100, {});
        }
        // --------------------------

        let out:R.delUser.ResponseI = null;
        if (ok) { // Формирование ответа
            out = {
                del_user:bDelUser, // Подтверждение регистрации
                list_user:listUser // Список пользователей
            };
        }

        return out;
    }

}
