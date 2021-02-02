 
import { MainRequest } from '../System/MainRequest';
import { Seo } from '../System/Seo';

/**
 * Подключение модля seo
 * @param req 
 * @param response 
 * @param next 
 */
export default function SeoMiddleware(req: MainRequest, response: any, next: any) {

    req.seo = new Seo();

    next();
}