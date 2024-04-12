import ApiConfig from './ApiConfig';
import axios from 'axios';

class FavoriteServices {

    getFavoritesList = async (guid) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Favoritos/ObtenerFavorito';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idCliente=${guid}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
             
            // console.log(urlCompleta);

            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log('response.data: ', response.data);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(null);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
            
        });
    };

    getFavorite = async (idCliente,idServicio) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Favoritos/ObtenerIdFavorito';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idCliente=${idCliente}&idServicio=${idServicio}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
             
            // console.log(urlCompleta);

            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log('response.data: ', response.data);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(null);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
            
        });
    };

    postFavorite = async (json) => {
        return new Promise((resolve, reject) => {
            var method = 'Favoritos/AgregarFavorito';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };

            axios.post(urlCompleta, json, { headers })
            .then(function (response) {
                console.log('response', response.data);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.data);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
        });
    }

    putNotifications = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Empresas/ActualizarEmpresa';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);
            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log('response: ', response);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
        });   
    }

    deleteFavorite = async (guid) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Favoritos/EliminarFavorito';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            axios.delete(urlCompleta, { headers })
            .then(function (response) {
                console.log('response', response.data);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
        });
    }
}

export default new FavoriteServices();