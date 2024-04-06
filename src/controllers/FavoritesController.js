import FavoriteServices from '../services/FavoriteServices';

class FavoriteController {

	getFavoritesForService(guid) {
		console.log('getFavoritesForService',guid);
		return new Promise((resolve, reject) => {
		
			if ((guid == '') || (guid == undefined)) {
				reject('Debe pertenecer a un Servicio.');
				return;
			}

			FavoriteServices.getFavoritesList(guid)
			.then(favoritesReturn => {
				// console.log('favoritesReturn', favoritesReturn);
				if (favoritesReturn !== null) {
					resolve(favoritesReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getFavoritesForService', error);
			});
		});
	}

	getFavorite(idCliente,idServicio) {
		console.log('getFavorite',' -'+idCliente+' -'+idServicio);
		return new Promise((resolve, reject) => {
		
			if ((idServicio == '') || (idServicio == undefined)) {
				reject('Debe pertenecer a un Servicio.');
				return;
			}
			if ((idCliente == '') || (idCliente == undefined)) {
				reject('Debe pertenecer a un Cliente.');
				return;
			}

			FavoriteServices.getFavorite(idCliente,idServicio)
			.then(favoritesReturn => {
				// console.log('favoritesReturn', favoritesReturn);
				if (favoritesReturn !== null) {
					resolve(favoritesReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getFavorite', error);
			});
		});
	}

	handleFavoriteDelete(guid) {
		console.log('handleFavoriteDelete',guid);
		return new Promise((resolve, reject) => {
		
			FavoriteServices.deleteFavorite(guid)
			.then(favoReturn => {
				resolve(favoReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleFavoriteCreate(data) {
		console.log('handleFavoriteCreate',data);
		return new Promise((resolve, reject) => {
			
			if (data.idcliente == '') {
				reject('Falta el Cliente.');
				return;
			}
			if (data.idServicio == '') {
				reject('Falta el Servicio.');
				return;
			}

			FavoriteServices.postFavorite(data)
			.then(favoReturn => {
				resolve(favoReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}


export default new FavoriteController();