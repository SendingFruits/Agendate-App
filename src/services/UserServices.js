import ApiConfig from './ApiConfig';
import axios from 'axios';

class UserServices {

    doLogin = async (username, password) => {
        return new Promise((resolve, reject) => {
        
            const usuarioCodificado = encodeURIComponent(username);
            const contraseniaCodificada = encodeURIComponent(password);
            
            var method = 'Usuarios/Login';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
                +`pUsuario=${usuarioCodificado}&`
                +`pContrasenia=${contraseniaCodificada}`;

            // console.log(urlCompleta);

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                // console.log(response.data);
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
    };

    getDataUser = async (username, password) => {
        return new Promise((resolve, reject) => {
        
            const usuarioCodificado = encodeURIComponent(username);
            const contraseniaCodificada = encodeURIComponent(password);
            
            var method = 'Usuarios/Login';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
                +`pUsuario=${usuarioCodificado}&`
                +`pContrasenia=${contraseniaCodificada}`;

            // console.log(urlCompleta);

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            axios.post(urlCompleta, {}, { headers })
            .then(function (response) {
                // console.log(response.data);
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
    };

    postUserRegister = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method;

            if (json.tipoUsuario == 'customer') {
                method = 'Clientes/RegistrarCliente';
            } 
            if (json.tipoUsuario == 'company') {
                method = 'Empresas/RegistrarEmpresa';
            } 

            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);
            axios.post(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log('status: ',JSON.stringify(response.status));
                // console.log('response: ', response);
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
    };
    
    putUserDataCompany = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Usuarios/ActualizarDatosBasicosUsuarios';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);

            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log(response.status);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
        });
    };

    putUserDataCustomer = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Clientes/ActualizarDatosBasicosCliente';
            var urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            console.log('urlCompleta: ', urlCompleta);

            axios.put(urlCompleta, json, { headers })
            .then(function (response) {
                // console.log(response.status);
                if (response.status == 200) {
                    // deberia devolver el objeto con los datos nuevos, pero no devuelve nada
                    resolve(response.data);
                } else {
                    resolve(response.errors);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
        });
    };

    putPassword = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Usuarios/ActualizarContraseniaBody';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;
            
            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);

            axios.put(urlCompleta, json)
            .then(response => {
                // console.log('response: ', response);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(false);
                }
            })
            .catch(error => {
                reject(ApiConfig.cnnError(error));
            });
        });
    }

    recoveryPass = async (json) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Usuarios/GenerarClaveRecuperacionUsuario';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
                +`nomUsuario=${json.user}&`
                +`correoUsuario=${json.email}&`
                +`celular=${json.movil}`;

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            // console.log('json: ', json);
            // console.log('urlCompleta: ', urlCompleta);

            axios.post(urlCompleta, {})
            .then(response => {
                console.log('response: ', response);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve('Error al enviar la información...');
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
        });
    }

    putDelete = async (id) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Usuarios/EliminarUsuario';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?id=${id}`;
            
            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };
            
            axios.put(urlCompleta,{},{})
            .then(response => {
                // console.log('response: ', response);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    resolve(false);
                }
            })
            .catch(error => {
                reject(ApiConfig.cnnError(error));
            });
        });
    }

    putConnect = async (type,url) => {
        return new Promise((resolve, reject) => {
            try {
                console.log('services type',type);
                console.log('services url', url);

                if (type === 'Ngrok') {
                    ApiConfig.setNgrok(url);    
                }    
                ApiConfig.setHost(type);
                console.log('setting url', ApiConfig.API_BASE_URL);

                if (ApiConfig.API_BASE_URL) {
                    resolve(ApiConfig.API_BASE_URL);
                } else {
                    resolve('No se adjunto el valor');
                }
            } catch (error) {
                reject(ApiConfig.cnnError(error));
            }
        });
    }
}

export default new UserServices();