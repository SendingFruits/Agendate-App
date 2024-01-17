import ApiConfig from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompanies = async (lat, lng, cte) => {
        return new Promise((resolve, reject) => {
        
            var method = 'Empresas/ObtenerEmpresasMapa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?`
                + `radioCircunferencia=${cte}&`
                + `latitudeCliente=${lat}&`
                + `longitudeCliente=${lng}`;
    
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'text/json',
                    // 'verify': false
                },
            };
    
            // console.log('urlCompleta: ',urlCompleta); 

            axios.get(urlCompleta, options)
            .then(function (response) {
                // console.log(response.data);
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    if (response.status === 204) resolve([]);
                    else resolve(-1);
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


}

export default new MapServices();