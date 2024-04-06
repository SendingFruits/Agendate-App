import UserServices from '../services/UserServices';
import CompanyServices from '../services/CompanyServices';

class UsersController {

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
			

			if (data.username == '') {
				reject('Por favor ingrese el username.');
				return;
			}
			if (data.password == '') {
				reject('Por favor ingrese la contraseña.');
				return;
			}
			if (data.nombre == '') {
				reject('Por favor ingrese el nombre.');
				return;
			}
			if (data.apellido == '') {
				reject('Por favor ingrese el apellido.');
				return;
			}
			if (data.email == '') {
				reject('Por favor ingrese el correo electrónico.');
				return;
			}

			if (data.userType === 'customer' && data.document == '') {
				reject('Por favor ingrese su documento de identidad.');
				return;
			} 
			
			if (data.userType === 'company' && data.document == '') {
				reject('Por favor ingrese el RUT de su Empresa.');
				return;
			} 
		

			if (data.password.length < 8) {
				reject('La contraseña debe tener al menos 8 caracteres como minínimo.');
				return;
			}

			var dataConvert = {};
			
			if (data.userType === 'company') {
				dataConvert = {
					rutDocumento: data.document,
					razonSocial: "",
					nombrePropietario: data.firstName.trim() + ' ' + data.lastName.trim(),
					rubro: "",
					direccion: "",
					ciudad: "",
					descripcion: "",
					latitude: 0.00,
					longitude: 0.00,

					nombre: data.firstName.trim(),
					apellido: data.lastName.trim(),
					nombreUsuario: data.username.trim(),
					contrasenia: data.password.trim(),
					celular: data.movil.trim(),
					correo: data.email.trim(),
					tipoUsuario: data.userType,
					logo: '',
				}
			} else {
				dataConvert = {
					documento: data.document.trim(),

					nombre: data.firstName.trim(),
					apellido: data.lastName.trim(),
					nombreUsuario: data.username.trim(),
					contrasenia: data.password.trim(),
					celular: data.movil.trim(),
					correo: data.email.trim(),
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
				return;
			}
			if (data.pass == '') {
				reject('Falta la contraseña.');
				return;
			}
			if (data.firstName == '') {
				reject('Falta el nombre.');
				return;
			}
			if (data.lastName == '') {
				reject('Falta el apellido.');
				return;
			}
			if (data.email == '') {
				reject('Falta el correo electrónico.');
				return;
			}
			if (data.movil == '') {
				reject('Falta el celular.');
				return;
			}

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
				return;
			}
			if (data.new === '') {
				reject('Debe ingresar la Contraseña Nueva.');
				return;
			}
			if (data.new.length < 8) {
				reject('La contraseña nueva debe tener al menos 8 caracteres como minínimo.');
				return;
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
				return;
			}

		});
	}

	handleRecoveryPass(dataJSON) {
		return new Promise((resolve, reject) => {

			var data = JSON.parse(dataJSON);

			if (data.user === '') {
				reject('Debe ingresar su nombre de usuario.');
				return;
			}
			if (data.email === '') {
				reject('Debe ingresar su correo electronico.');
				return;
			}
			if (data.movil === '') {
				reject('Debe ingresar su número de teléfono.');
				return;
			}

			var json = {
                'user':data.user,
                'email':data.email,
                'movil':data.movil,
            }
			
			UserServices.recoveryPass(json)
			.then(msgReturn => {
				resolve(msgReturn);
			})
			.catch(error => {
				reject(error);
			});
	
		});
	}

	getCompanyData(guid) {
		return new Promise((resolve, reject) => {
			if ((guid == '') || (guid == undefined)) {
				reject('Se requiere ID de Empresa.');
				return;
			}

			CompanyServices.getDataCompany(guid)
			.then(serviceReturn => {
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
				return;
			}

			if (data.location.latitude === undefined) data.location.latitude = 0.0;
			if (data.location.longitude === undefined) data.location.longitude = 0.0; 
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