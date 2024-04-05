import MapServices from '../services/MapServices';
import * as Location from 'expo-location';

class MapController {

    getLocation = async () => {
        console.log('getLocation');
        try {
            const locationOptions = {
                accuracy: Location.Accuracy.BestForNavigation,
                timeout: 3000,
                maximumAge: 0,
                distanceInterval: 0.5,
                foregroundService: true
            };
    
            const { coords } = await Location.getCurrentPositionAsync(locationOptions);
            const { latitude, longitude } = coords;
            const initialRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.0200,
                longitudeDelta: 0.0200
            };
            // console.log(initialRegion);
            return initialRegion;
        } catch (error) {
            console.log('Error al obtener la ubicación:', error);
            throw error;
        }
    };

    requestLocationPermission = async () => {
        console.log('requestLocationPermission');
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permiso de acceso a la ubicación denegado.');
        }
        return status;
    };

    searchCompany = async (name) => {
        console.log('searchCompany');
        return new Promise((resolve, reject) => {
			// console.log('getServicesForCompany', guid);
			if ((name == '') || (name == undefined)) {
				reject('Ingrese la Razon Social de la empresa.');
                return;
			}

			MapServices.getSearch(name)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getCompanyData', error);
			});
		});
    };

    companyLocations = async (loc,cte) => {
        console.log('companyLocations', loc);
        var list = await MapServices.getCompanies(loc.latitude,loc.longitude,cte);
        // console.log('list: ',list);
        if (list !== undefined) {
            const organizedCompanies = list.map(company => {
                return {
                    id: company.id,
                    title: company.razonSocial,
                    location: {
                        "latitude":company.latitude,
                        "longitude":company.longitude,
                        "latitudeDelta": 0.00699,
                        "longitudeDelta":0.00499,
                    },
                    address: company.direccion,
                    description: company.descripcion,
                    itemCompany: company.rubro,
                    logo: company.logo, 
                }
            });
            return organizedCompanies;
        } else {
            return null;
        }
    };

}

export default new MapController();