import ApiConfig from './ApiConfig';
import axios from 'axios';

class MapServices {

    getCompanies = async (lat, lng, cte) => {
        // console.log(cte);
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
                    // 'Authorization': `Bearer ${ApiConfig.JWT}`
                },
            };
    
            console.log('URL REQUEST MAP: ',urlCompleta); 

            // axios.defaults.httpsAgent = new https.Agent({  
            //     rejectUnauthorized: false
            // });

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
                reject(ApiConfig.cnnError(error));
            });
            
        });
    };

    getSearch = async (name) => {
        return new Promise((resolve, reject) => {
  
            var method = 'Empresas/BuscarEnMapa';
            const urlCompleta = `${ApiConfig.API_BASE_URL}${method}?nombre=${name}`;
    
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
}

export default new MapServices();