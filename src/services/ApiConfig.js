class ApiConfig {

    constructor() {

        this.AZURE_HOST = 'https://agendateapp-api.azurewebsites.net/api/';
        this.LOCAL_HOST = 'https://186.48.52.221:9083/api/';
        
        this.NGROK_KEY = 'c6b0-2800-a4-c096-c100-6dd8-39d5-62b5-4c81';
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

