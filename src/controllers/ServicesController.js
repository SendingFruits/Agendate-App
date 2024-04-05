import CompanyServices from '../services/CompanyServices';

class ServicesController {

	getServicesForCompany(guid) {
		console.log('getServicesForCompany',guid);
		return new Promise((resolve, reject) => {
			// console.log('getServicesForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				reject('Debe pertenecer a una empresa.');
				return;
			}

			CompanyServices.getServicesForCompany(guid)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getServicesForCompany', error);
			});

		});
	}

	getServicesOfCompany(guid) {
		console.log('getServicesOfCompany',guid);
		return new Promise((resolve, reject) => {
			console.log('getServicesForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				reject('Debe pertenecer a una empresa.');
				return;
			}

			CompanyServices.getServicesOfCompany(guid)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getServicesForCompany', error);
			});

		});
	}

	handleServiceUpdate(data) {
		console.log('handleServiceUpdate',data);
		return new Promise((resolve, reject) => {
		
			if (data.nombre == '') {
				reject('Falta el Nombre.');
				return;
			}
			if (data.tipo == '') {
				reject('Falta el Tipo.');
				return;
			}
			if (data.comienzo == '') {
				reject('Falta la hora de Comienzo.');
				return;
			}
			if (data.termino == '') {
				reject('Falta la hora de Termino.');
				return;
			}
			if (data.dias == '') {
				reject('Falta seleccionar los dias.');
				return;
			}

			// console.log('data: ', data);
			// var dias = data.diasList.filter(Boolean).join(';');

			var dataConvert = {	
				id: data.id,
				nombre: data.nombre,
				tipoServicio: data.tipo,
				costo: data.costo,
				// horaInicio: data.comienzo,
				// horaFin: data.termino,
				duracionTurno: data.turno,
				descripcion: data.descripcion,
				jsonDiasHorariosDisponibilidadServicio: JSON.stringify(data.dias),
				idEmpresa: data.guid
			}

			CompanyServices.putServiceData(dataConvert)
			.then(servReturn => {
				resolve(servReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleServiceDelete(guid) {
		console.log('handleServiceDelete',guid);
		return new Promise((resolve, reject) => {
		
			CompanyServices.deleteService(guid)
			.then(servReturn => {
				resolve(servReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleServiceCreate(data) {
		console.log('handleServiceCreate',data);
		return new Promise((resolve, reject) => {
			
			if (data.nombre == '') {
				reject('Falta el Nombre.');
				return;
			}
			if (data.tipo == '') {
				reject('Falta el Tipo.');
				return;
			}
			if (data.dias == '') {
				reject('Falta seleccionar algun dia.');
				return;
			}

			// var dias = data.diasList.filter(Boolean).join(';');

			descReplace = data.descripcion.replace(/\n/g, "\\n");

			var dataConvert = {	
				// id: data.id,
				nombre: data.nombre,
				tipoServicio: data.tipo,
				costo: data.costo,
				duracionTurno: data.turno,
				descripcion: descReplace,
				jsonDiasHorariosDisponibilidadServicio: JSON.stringify(data.dias),
				idEmpresa: data.guid
			}
			
			// console.log('dataConvert: ', dataConvert);

			CompanyServices.postServiceData(dataConvert)
			.then(srvReturn => {
				resolve(srvReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}

export default new ServicesController();