import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { MainRequest, ConfI, TError } from './MainRequest';
import { Seo } from './Seo';
import { UserI } from '../Infrastructure/SQL/Entity/WordE';
import * as express from 'express';

/**
 * Системный сервис формирования ответа
 */
export class ResponseSys {
	private env: string;
	private ifDevMode: boolean;
	protected sTpl: string; // шаблон для статика
	protected tError: TError; // тип ошибки в случае неудачи faResponseStatic

	private errorSys: AAClasses.Components.ErrorSys;

	constructor(req: MainRequest) {
		this.env = req.conf.common.env;
		if (this.env == 'local' || this.env == 'dev') {
			this.ifDevMode = true;
		} else {
			this.ifDevMode = false;
		}

		this.errorSys = req.sys.errorSys;
		this.tError = TError.AllBad;
	}

	/**
	 * Формирование ответа клиенту
	 *
	 * @param array|null data
	 * @param string sMsg
	 * @return array
	 */
	public response(data: any, sMsg: string): any {

		let out: any = {
			'ok': this.errorSys.isOk(),
			'e': !this.errorSys.isOk(),
			'errors': this.errorSys.getErrors(),
			// 'warning' : this.errorSys.getWarning(), // Временно убраны пользовательские предупреждения
			// 'notice' : this.errorSys.getNotice(), // Временно убраны пользовательские предупреждения
			'msg': sMsg,
		};

		if (this.ifDevMode) { // Выводит информацию для разработчиков и тестрировщиков
			out['dev_warning'] = this.errorSys.getDevWarning();
			out['dev_notice'] = this.errorSys.getDevNotice();
			// out['dev_declare'] = this.errorSys.getDevDeclare();
			out['dev_log'] = this.errorSys.getDevLog();
		}

		if (this.errorSys.isOk()) {
			out['data'] = data;
		} else {
			out['data'] = null;
			out['msg'] = 'Что то пошло не так - обратитесь к администратору';
		}

		return out;
	}


	/**
	 * Установить шаблон рендера для faResponseStatic
	 * @param sTpl 
	 */
	public fSetTpl(sTpl: string): ResponseSys {
		this.sTpl = sTpl;
		return this;
	}

	/**
	 * тип ошибки в случае неудачи faResponseStatic
	 * @param sTpl 
	 */
	public fSetTError(tError: TError): ResponseSys {
		this.tError = tError;
		return this;
	}


	/**
	 * Функция рендера страницы
	 * @param faCallback - функция контролера
	 * @param tpl - путь к шаблону hbs
	 * ПОМНИТЕ об fSetTpl и fSetTError
	 */
	public async faResponseStatic(faCallback: Function) {
		return async (req: MainRequest, res: express.Response, next: any) => {
			try {
				res.render(this.sTpl, fResponse(req, await faCallback(req)));
			} catch (error) {
				req.errorType = this.tError;
				next(error);
			}
		};
	};


}


/**
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 */
export interface ResponseI {
	seo: Seo, // Данные по сео страницы
	route: string, //Данные про путь (роут)
	data: any, // данные под конкретную стр
	config: ConfI, // общий конфиг всего
	userInfo: UserI; // данные по юзеру
	bAuth: boolean; // признак автризации
	bIsAdmin: boolean; // признак админа
	layout?: (boolean | string);
	bIsProd?: boolean;
	sRefer: string; // рефер
}


/**
 * Функиця формирующая данные для шаблона
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 * @param req 
 * @param data 
 */
export const fResponse = (req: MainRequest, data: any): ResponseI => {
	return {
		seo: req.seo, // Данные по сео страницы
		route: fGetRoutePath(req), //Данные про путь (роут)
		data: data, // данные под конкретную стр
		config: req.conf, // общий конфиг всего
		userInfo: req.sys.userSys.userInfo, // данные по юзеру
		bAuth: req.sys.bAuth, // признак автризации
		bIsAdmin: req.sys.userSys.isAdmin(), // признак админа
		bIsProd: req.conf.common.env == 'prod', // признак модератора
		sRefer: req.header('Referer'),
		// layout: true, // вкл главный шаблон backend/src/Views/layouts/main.hbs
	};
}


/*
* Костыль над версией пакета ноды
* @param req 
*/
export const fGetRoutePath = (req: any): string => {

	let resp = null;

	try {
		resp = req.route.path;
	} catch (e) {

	}

	if (resp == null) {
		try {
			resp = req.route.originalUrl;
		} catch (e) {

		}
	}

	return resp

}



/**
 * Функция рендера страницы
 * @param faCallback - функция контролера
 * @param tpl - путь к шаблону hbs
 */
export const faResponseStatic = (tpl: string, tError: TError, faCallback: Function) => {
	return async (req: MainRequest, res: express.Response, next: any) => {
		try {
			res.render(tpl, fResponse(req, await faCallback(req)));
		} catch (error) {
			req.errorType = tError;
			next(error);
		}
	};
};

