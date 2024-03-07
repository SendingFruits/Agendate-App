import UserServices from '../services/UserServices';
import CompanyServices from '../services/CompanyServices';


class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}


	handleLogin(username, password) {
		return new Promise((resolve, reject) => {

			if (username == '') {
				reject('Por favor ingrese el username.');
				return;
			}
			if (password == '') {
				reject('Por favor ingrese la contraseña.');
				return;
			}

			UserServices.doLogin(username, password)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleRegister(data) {
		return new Promise((resolve, reject) => {
			
			// console.log(data);

			if (data.username == '') {
				reject('Por favor ingrese el username.');
			}
			if (data.password == '') {
				reject('Por favor ingrese la contraseña.');
			}
			if (data.nombre == '') {
				reject('Por favor ingrese el nombre.');
			}
			if (data.apellido == '') {
				reject('Por favor ingrese el apellido.');
			}
			if (data.email == '') {
				reject('Por favor ingrese el correo electrónico.');
			}

			if (data.userType === 'customer' && data.document == '') {
				reject('Por favor ingrese su documento de identidad.');
			} 
			
			if (data.userType === 'company' && data.document == '') {
				reject('Por favor ingrese el RUT de su Empresa.');
			} 
		
			var dataConvert = {};
			
			if (data.userType === 'company') {
				dataConvert = {
					rutDocumento: data.document,
					razonSocial: "",
					nombrePropietario: data.firstName + ' ' + data.lastName,
					rubro: "",
					direccion: "",
					ciudad: "",
					descripcion: "",
					latitude: 0.00,
					longitude: 0.00,

					nombre: data.firstName,
					apellido: data.lastName,
					nombreUsuario: data.username,
					contrasenia: data.password,
					celular: data.movil,
					correo: data.email,
					tipoUsuario: data.userType,
					logo: '',
				}
			} else {
				dataConvert = {
					documento: data.document,

					nombre: data.firstName,
					apellido: data.lastName,
					nombreUsuario: data.username,
					contrasenia: data.password,
					celular: data.movil,
					correo: data.email,
					tipoUsuario: data.userType,

					// tieneNotificaciones: data.recibe
				}
			}

			UserServices.postUserRegister(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleUpdate(data, type) {
		return new Promise((resolve, reject) => {
		
			if (data.type === 'customer' 
			 && data.docu == '') {
				reject('Falta el Documento.');
			}
			if (data.pass == '') {
				reject('Falta la contraseña.');
			}
			if (data.firstName == '') {
				reject('Falta el nombre.');
			}
			if (data.lastName == '') {
				reject('Falta el apellido.');
			}
			if (data.email == '') {
				reject('Falta el correo electrónico.');
			}
			if (data.movil == '') {
				reject('Falta el celular.');
			}

			console.log(type);

			if (type === 'customer') {

				const dataConvert = {
					id: data.guid,
					documento: data.docu,
					nombre: data.firstname,
					apellido: data.lastname,
					celular: data.movil,
					correo: data.email,
					foto: data.foto,
					tieneNotificaciones: data.recibe,
				}

				console.log(dataConvert);

				UserServices.putUserDataCustomer(dataConvert)
				.then(userReturn => {
					resolve(userReturn);
				})
				.catch(error => {
					reject(error);
				});
			} else {

				const dataConvert = {
					id: data.guid,
					nombre: data.firstname,
					apellido: data.lastname,
					celular: data.movil,
					correo: data.email,
				}

				UserServices.putUserDataCompany(dataConvert)
				.then(userReturn => {
					resolve(userReturn);
				})
				.catch(error => {
					reject(error);
				});
			}
		});
	}

	handleUpdatePass(data) {
		return new Promise((resolve, reject) => {

			if (data.old === '') {
				reject('Debe ingresar la Contraseña Actual.');
			}
			if (data.new === '') {
				reject('Debe ingresar la Contraseña Nueva.');
			}

			var json = {
                'Id':data.idu,
                'passVieja':data.old,
                'passNueva':data.new,
            }

			if (data.new !== data.old) {
				UserServices.putPassword(json)
				.then(msgReturn => {
					resolve(msgReturn);
				})
				.catch(error => {
					reject(error);
				});
			} else {
				reject('La contraseña sigue siendo igual, debe ser diferente');
			}

		});
	}


	getCompanyData(guid) {
		return new Promise((resolve, reject) => {
			// console.log('getServicesForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				reject('Se requiere ID de Empresa.');
			}

			CompanyServices.getDataCompany(guid)
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
	}

	handleCompanyUpdate(data) {
		return new Promise((resolve, reject) => {
		
			if (data.rut == '') {
				reject('Falta el RUT.');
			}
			// if (data.owner == '') {
			// 	reject('Falta el Nombre del Propietario.');
			// }
			// if (data.businessName == '') {
			// 	reject('Falta el Razon Social.');
			// }
			// if (data.category == '') {
			// 	reject('Falta el Rubro.');
			// }
			// if (data.address == '') {
			// 	reject('Falta la Dirección.');
			// }
			// if (data.description == '') {
			// 	reject('Falta la Ddescripción.');
			// }

			if (data.location.latitude === undefined) data.location.latitude = 0.0;
			if (data.location.longitude === undefined) data.location.longitude = 0.0; 

			// console.log('data: ',data);
			var code64 = 'data:image/png;base64, ';

			var dataConvert = {
				id: data.guid,
				rutDocumento: data.rut,
				razonSocial: data.businessName,
				nombrePropietario: data.owner,
				rubro: data.category,
				direccion: data.address,
				ciudad: data.city,
				descripcion: data.description,
				latitude: data.location.latitude,
				longitude: data.location.longitude,
				logo: data.logoBase
			}
			console.log('dataConvert: ',dataConvert);
			

			CompanyServices.putCompanyData(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleDelete(id) {
		return new Promise((resolve, reject) => {
			UserServices.putDelete(id)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

}

export default new UsersController();