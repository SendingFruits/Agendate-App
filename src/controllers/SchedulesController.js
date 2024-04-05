import BookingServices from '../services/BookingServices';

class SchedulesController {

	getSchedulesForService(guid, date) {
		console.log('getSchedulesForService',' -'+guid+' -'+date);
		return new Promise((resolve, reject) => {

			// console.log('service', guid);
			// console.log('date', date);

			if ((guid == '') || (guid == undefined)) {
				reject('Debe existir un servicio.');
				return;
			}
			if ((date == '') || (date == undefined)) {
				reject('Debe existir una fecha.');
				return;
			}

			BookingServices.getSchedulesOfServices(guid, date)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				resolve(serviceReturn);
			})
			.catch(error => {
				reject(error.mensaje);
			});
		});
	}
}

export default new SchedulesController();