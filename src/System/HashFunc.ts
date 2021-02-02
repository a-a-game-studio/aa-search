/**
 * Модуль для работы с паролем и токеном
 */

const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');
/**
 * Выдает зашифрованный пароль
 * @param pass 
 * @returns hash
 */
export function fPassToHash(pass: string): string {
    return md5(pass);
}


/**
 * Генерирует токен
 */
export function fGenerateToken(): string {
    return uniqid(uuidv4()+'-');
}