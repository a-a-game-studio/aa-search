
// Базовые роуты проверки core api
// Общие сведения о системе
import * as IndexController from '../Module/Common/Controller/IndexController';

// api для пользователя
import * as UserController from '../Module/User/Controller/UserController';

// api login
import * as LoginCtrl from '../Module/Login/LoginCtrl';

// admin-edit-user
import * as AdminEditUserCtrl from '../Module/AdminEditUser/AdminEditUserCtrl';

// admin-edit-group
import * as AdminEditGroupCtrl from '../Module/AdminEditGroup/AdminEditGroupCtrl';

// admin-edit-enum
import * as AdminEditEnumCtrl from '../Module/AdminEditEnum/AdminEditEnumCtrl';

import * as FileCtrl from "../Module/File/FileCtrl";



export {
    IndexController,
    UserController,
    LoginCtrl,
    AdminEditUserCtrl,
    AdminEditGroupCtrl,
    AdminEditEnumCtrl,
    FileCtrl,
}