class ApiConfig {

    constructor() {

        this.AZURE_HOST = 'https://agendateapp-api.azurewebsites.net/api/';
        this.LOCAL_HOST = 'https://186.48.52.221:9083/api/';
        
        this.NGROK_KEY = 'f63f-2800-a4-c0cd-8a00-bc71-5ed7-2632-9068';
        this.NGROK_HOST = 'https://'+this.NGROK_KEY+'.ngrok-free.app/api/';

        this.API_BASE_URL = this.NGROK_HOST;
    }

    setNgrok = async (token) => {
        this.NGROK_KEY = token;
    };

    getURL = async () => {
        return this.API_BASE_URL;
    };

    setHost = async (method) => {
        switch (method) {
            case 'Ngrok':
                this.API_BASE_URL = this.NGROK_HOST;
                break;
            case 'Localhost':
                this.API_BASE_URL = this.LOCAL_HOST;
                break;
            case 'Azure':
                this.API_BASE_URL = this.AZURE_HOST;
                break;
            default:
                this.API_BASE_URL = '';
                break;
        }
    }
}

export default new ApiConfig();

