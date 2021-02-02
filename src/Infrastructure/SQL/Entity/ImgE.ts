// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';


/**
 * Описание полей пользователя
 */
export interface ImgI {
    id?: number;
    file_name: string; // имя файла md5 от исходника
    f_320: string; // x320
    f_800: string;
    f_1024: string;
}


export class ImgE {
    //Имя таблицы
    public static NAME = 'aa_img';

    public getRulesInsert() {
        let rules = new Components.ModelRulesC();


        rules.set(rules.rule('file_name')
            .type(ModelRulesT.text)
            .require()
            .error('file_name - неверный формат')
        );     

        rules.set(rules.rule('f_320')
            .type(ModelRulesT.text)
            .require()
            .error('f_320 - неверный формат')
        );     

        rules.set(rules.rule('f_800')
            .type(ModelRulesT.text)
            .require()
            .error('f_800 - неверный формат')
        );     

        rules.set(rules.rule('f_1024')
            .type(ModelRulesT.text)
            .require()
            .error('f_1024 - неверный формат')
        );     

        return rules.get();
    }

   
}
