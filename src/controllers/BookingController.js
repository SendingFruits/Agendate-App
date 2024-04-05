import BookingServices from '../services/BookingServices';

class BookingController {

    getBookingsForCustomer = async (guid) => {
		console.log('getBookingsForCustomer',guid);
		return new Promise((resolve, reject) => {
			// console.log('guid', guid);
			if ((guid == '') || (guid == undefined)) {
				reject('Debe existir un Cliente.');
				return;
			}

			BookingServices.getBookings(guid, null, 'Clientes')
			.then(bookingsReturn => {
				// console.log('bookingsReturn', bookingsReturn);
				if (bookingsReturn !== null) {
					resolve(bookingsReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getBookingsForCustomer '+ error);
			});
		});
    };

    getBookingsForCompany = async (guid, date) => {
		console.log('getBookingsForCompany',guid);
		return new Promise((resolve, reject) => {
			// console.log('guid', guid);
			// console.log('date', date);
			if ((date !== null) && (guid !== '')) {	
				BookingServices.getBookings(guid, date, 'Empresas')
				.then(serviceReturn => {
					// console.log('serviceReturn', serviceReturn);
					if (serviceReturn !== null) {
						resolve(serviceReturn);
					} else {
						resolve(null);
					}
				})
				.catch(error => {
					reject(error.mensaje);
				});
			}
		});
    };

	handleCreateBooking(data) {
		console.log('handleCreateBooking',data);
		return new Promise((resolve, reject) => {
			// console.log('data: ', data);
			// if (data.username == '') {
			// 	reject('Por favor ingrese el username.');
			// }
			var dataConvert = {};
			// var fechaHoraTurno = data.fechaHoraTurno.replace('T',' ');
			dataConvert = {
				idCliente: data.idCliente,
				idServicio: data.idServicio,
				fechaHoraTurno: data.fechaHoraTurno+'.000Z',
				estado: data.estado,
			}
			// console.log('dataConvert: ', dataConvert);

			BookingServices.postBooking(dataConvert)
			.then(bookReturn => {
				resolve(bookReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleCancelBooking(guid) {
		console.log('handleCancelBooking',guid);
		return new Promise((resolve, reject) => {	
			BookingServices.putBookingStatus(guid, 'cancel')
			.then(bookReturn => {
				resolve(bookReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleDoneBooking(guid) {
		console.log('handleDoneBooking',guid);
		return new Promise((resolve, reject) => {
			BookingServices.putBookingStatus(guid, 'done')
			.then(bookReturn => {
				resolve(bookReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}

export default new BookingController();

