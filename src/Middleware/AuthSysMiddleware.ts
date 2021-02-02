import { MainRequest } from '../System/MainRequest';
import { UserSys } from '../System/UserSys';

/* проверка аутентификации на уровне приложения */
export default async function AuthSysMiddleware(request: MainRequest, response: any, next: any) {
    if (request.headers.token) {
        request.sys.token = request.headers.token;
    } else {
        request.sys.token = '';
    }

    /* юзерь не авторизован */
    request.sys.bAuth = false;
    const userSys = new UserSys(request);

    // Инициализируем систему для пользователей
    await userSys.init();

    request.sys.userSys = userSys;


    next();
}