import ApiConfig from './ApiConfig';
import axios from 'axios';

class CompanyServices {

    getServicesForCompany = async (guid) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Servicios/BuscarServicioPorIdEmpresa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;
    
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

    getServicesOfCompany = async (guid) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Servicios/ObtenerServiciosDeLaEmpresa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;
    
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
                console.log('response.data: ', response.data);
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

    getDataCompany = async (guid) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Empresas/ObtenerEmpresaPorId';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;
    
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

    putCompanyData = async (json) => {
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

    postServiceData = async (json) => {
        return new Promise((resolve, reject) => {
            var method = 'Servicios/RegistrarServicio';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);

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
                reject(ApiConfig.cnnError(error));
            });
        });
    }

    putServiceData = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Servicios/ActualizarServicio';
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
                reject(ApiConfig.cnnError(error));
            });
        });
    }

    deleteService = async (guid) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Servicios/EliminarServicio';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${guid}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            axios.delete(urlCompleta, { headers })
            .then(function (response) {
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

export default new CompanyServices();