export interface Og {
    type: string;
    site_name: string;
    title: string;
    description: string;
    url: string;
    image: string;
    imageType: string;
}

/**
 * Для поисковиков
 */
export class Seo {

    public sUrl: string = '/'; // входящий url
    

    public sTitle: string;
    public sDescription: string;
    public sKeywords: string;
    public og: Og;
    public sLogoUrl: string = '';

    

    constructor() {

        this.sTitle = 'Site title';
        this.sDescription = 'site description';
        this.sKeywords = 'site api';

        this.og = {
            type: 'website',
            site_name: 'website',
            title: this.sTitle,
            description: this.sDescription,
            url: this.sUrl,
            image: this.sLogoUrl,
            imageType: 'image/jpeg',
        }
    }

    
    public reload() {
        this.og = {
            type: 'website',
            site_name: 'website',
            title: this.sTitle,
            description: this.sDescription,
            url: this.sUrl,
            image: this.sLogoUrl,
            imageType: 'image/jpeg',
        }
    }

    protected main() {
        this.sTitle = 'Site title'
    }

}