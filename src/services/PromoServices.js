import ApiConfig from './ApiConfig';
import axios from 'axios';

class PromoServices {

    getPromosList = async (guid) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Promociones/ObtenerPromocionPorEmpresa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?empresaId=${guid}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
             
            console.log(urlCompleta);

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
                if (error.message == 'Network Error') {
                    reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
                } else {
                    if (error.response.status >= 500) {
                        reject(-1);                
                    } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                        reject(error.response.data); 
                    } else {
                        reject('Error Desconocido.');    
                    }
                }
            });
            
        });
    };

    postPromo = async (json) => {
        return new Promise((resolve, reject) => {
            var method = 'Promociones/CrearPromocion';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);
            axios.post(urlCompleta, json, { headers })
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.data);
                }
            })
            .catch(function (error) {
                if (error.message == 'Network Error') {
                    reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
                } else {
                    if (error.response.status >= 500) {
                        reject('Error de Servidor. Verifique su conexión a Internet o consulte el proveedor.');                
                    } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                        reject(error.response.data); 
                    } else {
                        reject('Error Desconocido.');    
                    }
                }
            });
        });
    }

    deletePromo = async (guid) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Promociones/EliminarPromocion';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };
            
            axios.delete(urlCompleta, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    resolve(response.data);
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                reject(error.response.data);
            });
        });
    }

    putPromo = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Promociones/ActualizarPromocion';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);
            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log(response);
                if (response.status == 200) {
                    // deberia devolver el objeto con los datos nuevos, pero no devuelve nada
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                // console.log('error: ', error);
                // reject(error.response.data);

                if (error.message == 'Network Error') {
                    reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
                } else {
                    if (error.response.status >= 500) {
                        reject(-1);                
                    } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                        reject(error.response.data); 
                    } else {
                        reject('Error Desconocido.');    
                    }
                }
            });
        });
    }

    postSendPromo = async (id) => {
        return new Promise((resolve, reject) => {
            var method = 'Promociones/EnviarPromocion';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idPromocion=${id}`;

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            console.log('id: ', id);
            console.log('urlCompleta: ', urlCompleta);
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.data);
                }
            })
            .catch(function (error) {
                if (error.message == 'Network Error') {
                    reject('Error de Conexión. Verifique su conexión a Internet o consulte el proveedor.');  
                } else {
                    if (error.response.status >= 500) {
                        reject('Error de Servidor. Verifique su conexión a Internet o consulte el proveedor.');                
                    } else if ((error.response.status >= 400) && (error.response.status < 500)) {
                        reject(error.response.data); 
                    } else {
                        reject('Error Desconocido.');    
                    }
                }
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
                // console.log('error.response.data: ', error.response.data);
                reject(error.response.data);
            });
        });   
    }

}

export default new PromoServices();