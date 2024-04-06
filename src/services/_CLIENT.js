import axios from 'axios';

class _CLIENT {

    constructor() {
        
        this.TOKEN = '0666-2800-a4-c1da-3600-bddd-9c89-311a-f6c3';
        this.NGROK_URL = 'https://'+this.TOKEN+'.ngrok-free.app/api/'; 
        this.API_BASE_URL = 'https://192.168.1.7:7170/api/'; 

        this.API_INSTANCE = axios.create({
            // baseURL: this.API_BASE_URL,
            baseURL: this.NGROK_URL,
        });
    }

    getToken = async () => {
        return this.API_URL_TOKEN;
    };

    getURL = async () => {
        return this.API_BASE_URL;
    };

}

export default new _CLIENT();