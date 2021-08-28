//import * as _ from 'lodash';

// Системные сервисы
import { MainRequest } from './MainRequest';


// SQL Запросы
import { ErrorSys } from '@a-a-game-studio/aa-components/lib';


/**
 * Клас который глобально знает все данные пользователя
 */
export class UserSys {

	public idUser: number; // ID пользователя
	private bAuth: boolean = false; // Статус авторизирован пользователь или нет

	private token: string; // APIKEY

	private userGroupsList: any; // Роли пользователя

	private ctrlAccessList: any; // Список модулей
	private aliasCtrlAccess: string; // Псевдоним модуля где мы находимся
	private idCtrlAccess: number; // ID модуля где мы находимся
	private accessCRUDList: any; // Доступ CRUD к модулю

	private req: MainRequest; // Объект запроса пользователя

	private errorSys:ErrorSys


	public constructor(req: MainRequest) {

		this.req = req;
		this.errorSys = req.sys.errorSys;

		this.ctrlAccessList = {};
		this.userGroupsList = {};
		this.accessCRUDList = {};

		/* вылавливаем token */

		this.token = req.sys.token;

		if (!this.token) {
			this.token = '';
			this.errorSys.devWarning('token', 'token - пустой');
		}

	}

	/**
	 * Инициализация данных пользователя
	 * тольrо если this.isAuth() == true
	 *
	 * @return void
	 */
	public async init() {
		let ok = this.errorSys.isOk(); // По умолчанию true

		// Проверяем apikey
		this.bAuth = false;

		if (this.bAuth) { // Ставим в общий слой видимости флаг авторизации
			this.req.sys.bAuth = true;
		}

	}


	/**
	 * Проверка является ли пользователь администратором
	 *
	 * @return boolean
	 */
	public isAdmin(): boolean {

		let ok = this.errorSys.isOk();


		return ok;
	}

	/**
	 * Проверка является ли пользователь авторизированным
	 */
	public async isAuth(): Promise<boolean> {

		let ok = this.errorSys.isOk();

		return ok;
	}

	/**
	 * Получить статус авторизирован пользователь или нет
	 */
	public ifAuth():boolean{
		return this.bAuth;
	}

	/**
	 * возвращает token
	 *
	 * @return string|null
	 */
	public fGetApikey(): string {
		return this.token;
	}

	/**
	 * Получить ID пользователя
	 */
	public getIdUser(): number {
		return this.idUser;
	}

}
