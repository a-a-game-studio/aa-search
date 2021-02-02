import { BaseCtrl, MainRequest } from "../../../Namespace/System";
import { UserModule } from '@a-a-game-studio/aa-classes/lib';
const express = require('express');
const router = express.Router();

 import { UserM } from '../Model/UserM';

 /**
  * Контроллер 
  */
 export class UserController extends BaseCtrl {
    
     static sBaseUrl = '/user';

     public userM: UserM;

     /**
      * Конструктор
      *
      * @param req
      * @param res
      */
     public static async Init(req: MainRequest, res: any): Promise<UserController> {
         const self = new UserController(req, res);

         /*  Инициализация бизнес моделей */
         self.userM = new UserM(req);

         /* ================================================== */

         /*  Проверка авторизации */
         await self.userSys.isAuth();

        /*   Проверка права доступа на модуль */
         await self.userSys.isAccessCtrl('user');

         /*  Проверка являетесь ли вы администратором */
         self.userSys.isAdmin();

         return self;
     }

 }

 /**
  * Индексная страница
  */
 router.post('/user', async (req: any, res: any) => {
     const self = <UserController>await UserController.Init(req, res);

     let ok = self.userSys.isAccessRead();  /* Проверка доступа */

     let out = null;
     if (ok) {  /* Получаем список пользователей */
         try {
             out = await self.userM.getSelfUserInfo(req.body);
         } catch (e) {
             self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
         }
     }

     res.send(
         self.responseSys.response(out, 'Получить информацию о себе')
     );
 });

 /**
  * Информация о харегисрированном пользователе
  */
 router.post('/user/get-user-info', async (req: any, res: any) => {

     const self = <UserController>await UserController.Init(req, res);
     let ok = self.userSys.isAccessRead();  /* Проверка доступа */

     let out = null;
     if (ok) {  /* Получаем список пользователей */
         try {
             out = await self.userM.getUserInfo(req.body);
         } catch (e) {
             self.errorSys.errorEx(e, 'fatal_error', 'Фатальная ошибка')
         }
     }

     res.send(
         self.responseSys.response(out, 'Получить информацию о пользователе')
     );
 });

export { router };
