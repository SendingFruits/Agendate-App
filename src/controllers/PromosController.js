import PromosServices from '../services/PromoServices';

class PromosController {

	getPromosForCompany(guid) {
		console.log('getPromosForCompany',guid);
		return new Promise((resolve, reject) => {
			// console.log('getPromosForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				reject('Debe pertenecer a una empresa.');
				return;
			}

			PromosServices.getPromosList(guid)
			.then(promosReturn => {
				// console.log('promosReturn', promosReturn);
				if (promosReturn !== null) {
					resolve(promosReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getPromosForCompany', error);
			});
		});
	}

	handlePromoUpdate(data) {
		console.log('handlePromoUpdate',data);
		return new Promise((resolve, reject) => {
		
			if (data.asunto == '') {
				reject('Falta el Asunto.');
				return;
			}
			if (data.mensaje == '') {
				reject('Falta el Mensaje.');
				return;
			}

			console.log('data: ', data);
			// var dias = data.diasList.filter(Boolean).join(';');

			var dataConvert = {	
				id: data.id,
				asuntoMensaje: data.asunto,
				cuerpoMensaje: data.mensaje,
			}

			PromosServices.putPromo(dataConvert)
			.then(servReturn => {
				resolve(servReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handlePromoDelete(guid) {
		console.log('handlePromoDelete',guid);
		return new Promise((resolve, reject) => {
		
			PromosServices.deletePromo(guid)
			.then(pReturn => {
				resolve(pReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handlePromoCreate(data) {
		console.log('handlePromoCreate',data);
		return new Promise((resolve, reject) => {
			
			if (data.asunto == '') {
				reject('Falta el Asunto.');
				return;
			}
			if (data.mensaje == '') {
				reject('Falta el Mensaje.');
				return;
			}

			var dataConvert = {	
				asuntoMensaje: data.asunto,
				cuerpoMensaje: data.mensaje,
				empresaId: data.guid,
			}
			
			console.log('dataConvert: ', dataConvert);

			PromosServices.postPromo(dataConvert)
			.then(srvReturn => {
				resolve(srvReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handlePromoSend(id) {
		console.log('handlePromoSend',id);
		return new Promise((resolve, reject) => {
			
			if (id == '') {
				reject('No hay promoción.');
				return;
			}
			
			PromosServices.postSendPromo(id)
			.then(srvReturn => {
				resolve(srvReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}

export default new PromosController();