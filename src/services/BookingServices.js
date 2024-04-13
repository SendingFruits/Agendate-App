import ApiConfig from './ApiConfig';
import axios from 'axios';

class BookingServices {

    getBookings = async (guid, date, type) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Reservas/ObtenerReservasDe'+type;

            var urlCompleta = '';
            
            if (type === 'Clientes') {
                urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idCliente=${guid}`;
            } else {
                urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idServicio=${guid}&fecha=${date}`;
            }
    
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
                console.log(response.data);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    if (response.status === 204) resolve([]);
                    else resolve(-1);
                }
            })
            .catch(function (error) {
                reject(ApiConfig.cnnError(error));
            });
            
        });
    };

    getSchedulesOfServices = async (guid, date) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Reservas/ObtenerHorariosSegunFecha';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?idServicio=${guid}&fecha=${date}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
             
            // console.log('urlCompleta: ', urlCompleta);

            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log('response: ', response);
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
    }

    postBooking = async (json) => {
        return new Promise((resolve, reject) => {
            
            var method = 'Reservas/RegistrarReserva';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}`;

            const headers = {
                // Agrega aquí las cabeceras requeridas por la API
            };
            
            // console.log('json: ', json);
            // console.log('url: ', urlCompleta);

            axios.post(urlCompleta, json, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    resolve(JSON.stringify(response.data));
                } else {
                    resolve(response.data);
                }
            })
            .catch(function (error) {
                // console.log('error: ', error);
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
    };

    putBookingStatus = async (guid, status) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Reservas/';
            var urlCompleta = `${ApiConfig.API_BASE_URL}`;

            if (status === 'cancel') {
                var sts = 'Rechazada';
                method = 'Reservas/CambiarEstadoReserva';
                urlCompleta += `${method}?idReserva=${guid}&estadoNuevo=${sts}`;
            }
            if (status === 'done') {
                var sts = 'Realizada';
                method = 'Reservas/CambiarEstadoReserva';
                urlCompleta += `${method}?idReserva=${guid}&estadoNuevo=${sts}`;
            }

            const headers = {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            };

            console.log('urlCompleta: ', urlCompleta);

            axios.put(urlCompleta, {}, { headers })
            .then(function (response) {
                console.log(response.status);
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
    };
}

export default new BookingServices();