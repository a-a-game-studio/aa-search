// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';
import { ModelRulesT } from '@a-a-game-studio/aa-components/lib';


/**
 * Описание полей пользователя
 */
export interface FileI {
    id?: number;
    file_name?: string;
}


export class FileE {
    //Имя таблицы
    public static NAME = 'aa_file';

    public getRulesInsert() {
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('file_name')
            .type(ModelRulesT.text)
            .require()
            .error('file_name - неверный формат')
        );     

        return rules.get();
    }

    /** Правила обновления таблицы */
    public getRulesUpdate() {

        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('file_name')
            .typeText()
            .error(FileE.NAME + ' - file_name')
        );

        return rules.get();
    }

   
}
