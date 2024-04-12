class ApiConfig {

    constructor() {

        this.AZURE_HOST = 'https://agendateapp-api.azurewebsites.net/api/';
        this.LOCAL_HOST = 'https://186.48.52.221:9083/api/';
        
        this.NGROK_KEY = '6f51-2800-a4-c1b4-b200-6427-b3ed-a36a-5e6e';
        this.NGROK_HOST = 'https://'+this.NGROK_KEY+'.ngrok-free.app/api/';

        this.API_BASE_URL = this.AZURE_HOST;
    }

    setNgrok = async (token) => {
        this.NGROK_KEY = token;
        setHost('Ngrok');
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

    cnnError = async (error) => {
        console.log('error api', error);
        var rs = 'Error de Conexión.';
        if (error.message == 'Network Error') {
            rs = 'Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.';  
        } else {
            if (error.response.status >= 500) {
                rs = -1;                
            } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                rs = error.response.data; 
            } else {
                rs = 'Error Desconocido.';    
            }
        }
        return rs;
    }
}

export default new ApiConfig();

