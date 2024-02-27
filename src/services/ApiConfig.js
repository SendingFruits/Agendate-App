class ApiConfig {

    constructor() {
        this.API_URL_TOKEN = '0abb-2800-a4-c1c0-3a00-45a6-bf38-c839-8f15';
        this.API_BASE_URL = 'https://'+this.API_URL_TOKEN+'.ngrok-free.app/api/';
        this.API_LOCALHOST = 'https://192.168.1.7:9083/api/';
        // this.API_BASE_URL = 'https://186.48.52.221:9083/api/';
    }

    
    getJWT = async () => {
        return this.JWT;
    };

    putJWT = async (jwt) => {
        this.JWT = jwt;
    };


    getToken = async () => {
        return this.API_URL_TOKEN;
    };

    getURL = async () => {
        return this.API_BASE_URL;
    };

    getErrorCode = async (error) => {
        return error.split(' ')[code.length - 1];
    };

    getConnectionStatus = async (code) => {
        if (code == 200) {
            return true;
        } else {
            return false;
        }
    };

    codeMessage = async (code) => {
        if (code >= 200 && code < 300) {
            return true;
        } else if (code >= 300 && code < 400) {
            return false;
        } else if (code >= 400 && code < 500) {
            return '';
        } else if (code >= 500) {
            return 'Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.';
        } else {
            reject('Error Desconocido.');    
        }
    };

    setNgrokToken = async (code) => {
        this.API_URL_TOKEN = getToken();
    }
}

export default new ApiConfig();

