var fs = require('fs');
import sharp = require('sharp');
import BaseM from '../System/BaseM';
const imgQuality = 80; // качество сжатия

/**
 * Сервис автоматизаций по работе с картинками
 */
export class ImgS extends BaseM {

    /**
     * Сохранить Base64 строку в файл
     * @param base64Image 
     * @param sFile 
     */
    public async faSaveBase64ToFile (base64Image: string, sFile: string){
        return new Promise((resolve, reject) => {
            fs.writeFile(sFile, this.fGetBase64Str(base64Image), { encoding: 'base64' }, function (err: any) {
                resolve(true);
            });
        });
    }

    /**
     * Сохранить из буфера в файл
     * @param img 
     * @param sFile 
     */
    public async faSaveBufferToFile (img: Buffer, sFile: string){
        return new Promise((resolve, reject) => {
            fs.writeFile(sFile, img, function (err: any) {
                resolve(true);
            });
        });
    }

    /**
     * Картинка base64 в Buffer
     * @param sDataBase64 
     */
    public fImgBase64ToBuffer(sDataBase64: string): Buffer{
        return Buffer.from(this.fGetBase64Str(sDataBase64), 'base64');
    }


    /**
     * Вырезает лишнее из строки Base64
     * @param sBase64 
     */
    public fGetBase64Str(sBase64: string): string{
        return sBase64.split(';base64,').pop();
    }

    /**
     * Изменить размер картинки и сохранить в файл
     * @param width
     * @param file
     */
    public async faResizeToBuffer(width: number, sDataBase64: any): Promise<Buffer>{
        return (await sharp(this.fImgBase64ToBuffer(sDataBase64))
            .resize(width)
            .jpeg({
                quality: imgQuality,
            })
            .toBuffer()
        );
    }
}