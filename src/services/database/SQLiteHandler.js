import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export const setLocalDB = () => {
    SQLiteHandler.createDb('agendate')
    .then(result => {
        setDbLoad(true);
        // console.log('DB Create... ', result);

        // SQLiteHandler.generateTestData()
        // .then(() => {
        // 	console.log('Generate data ok... ');
        // })
        // .catch(error => {
        // 	console.log('Generate data Error... ', error);
        // });

        // SQLiteHandler.updateDatos('Servicios', 4, {
        // 	'DiasDefinidosSemana':'Lunes;Martes;Miercoles;Jueves;Viernes;'
        // })
        // .then(() => {
        // 	console.log('Update data ok... ');
        // })
        // .catch(error => {
        // 	console.log('Update data Error... ', error);
        // });
    })
    .catch(error => {
        setDbLoad(false);
        // console.log('DB Error... ', error);
    });
}

// C:\Users\Administrador\AppData\Local\Google\AndroidStudio2021.3\device-explorer\pixel_5_-_api_30 [emulator-5554]\data

class SQLiteHandler {

    createDb = async (name, tables = null) => {
        return new Promise((resolve, reject) => {
            const dbPath = `${FileSystem.documentDirectory}SQLite/${name}.db`;

            FileSystem.getInfoAsync(dbPath)
                .then(dbInfo => {
                    if (dbInfo.exists && dbInfo.isDirectory === false) {
                        resolve('La base de datos ya existe en ' + dbPath);
                    } else {
                        const db = SQLite.openDatabase(name + '.db');

                        var usuariosTable = `
                            CREATE TABLE IF NOT EXISTS Usuarios (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Documento TEXT UNIQUE,
                                NombreUsuario TEXT UNIQUE,
                                Contrasenia TEXT,
                                Correo TEXT,
                                Nombre TEXT,
                                Apellido TEXT,
                                FotoLogo TEXT,
                                RecibeNotificaciones INTEGER,
                                Deleted INTEGER
                            );
                        `;

                        var empresasTable = `
                            CREATE TABLE IF NOT EXISTS Empresas (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Rut TEXT,
                                Descripcion TEXT,
                                RazonSocial TEXT,
                                Direccion TEXT,
                                Ciudad TEXT,
                                Latitud REAL,
                                Longitud REAL,
                                Deleted INTEGER,
                                FOREIGN KEY (ID) REFERENCES Usuarios(ID),
                                FOREIGN KEY (Rut) REFERENCES Usuarios(Documento)
                            );
                        `;

                        var clientesTable = `
                            CREATE TABLE IF NOT EXISTS Clientes (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Cedula TEXT,
                                Deleted INTEGER,
                                FOREIGN KEY (ID) REFERENCES Usuarios(ID),
                                FOREIGN KEY (Cedula) REFERENCES Usuarios(Documento)
                            );
                        `;

                        var serviciosTable = `
                            CREATE TABLE IF NOT EXISTS Servicios (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Empresa INTEGER,
                                Nombre TEXT,
                                HoraInicio TEXT,
                                HoraFin TEXT,
                                DiasDefinidosSemana TEXT,
                                DuracionTurno INTEGER,
                                TipoServicio TEXT,
                                Costo REAL,
                                Descripcion TEXT,
                                UltimaFecha TEXT,
                                Deleted INTEGER,
                                FOREIGN KEY (Empresa) REFERENCES Empresas(ID)
                            );
                        `;

                        var reservasTable = `
                            CREATE TABLE IF NOT EXISTS Reservas (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Cliente INTEGER,
                                Servicio INTEGER,
                                Estado TEXT,
                                FechaRealizada TEXT,
                                FechaHoraReserva TEXT,
                                Deleted INTEGER,
                                FOREIGN KEY (Cliente) REFERENCES Clientes(ID),
                                FOREIGN KEY (Servicio) REFERENCES Servicios(ID)
                            );
                        `;

                        var promocionesTable = `
                            CREATE TABLE IF NOT EXISTS Promociones (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Servicio INTEGER,
                                Nombre TEXT,
                                FechaCreacion TEXT,
                                Duracion INTEGER,
                                UltimoEnvio TEXT,
                                Deleted INTEGER,
                                FOREIGN KEY (Servicio) REFERENCES Servicios(ID)
                            );
                        `;

                        var notificacionesTable = `
                            CREATE TABLE IF NOT EXISTS Notificaciones (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Empresa INTEGER,
                                Promocion INTEGER,
                                Destinatarios TEXT,
                                CuerpoMail TEXT,
                                Asunto TEXT,
                                FechaEnvio TEXT,
                                Deleted INTEGER,
                                FOREIGN KEY (Empresa) REFERENCES Empresas(ID),
                                FOREIGN KEY (Promocion) REFERENCES Promociones(ID)
                            );
                        `;

                        var favoritosTable = `
                            CREATE TABLE IF NOT EXISTS Favoritos (
                                Cliente INTEGER,
                                Servicio INTEGER,
                                Deleted INTEGER,
                                FOREIGN KEY (Cliente) REFERENCES Clientes(ID),
                                FOREIGN KEY (Servicio) REFERENCES Servicios(ID),
                                PRIMARY KEY (Cliente, Servicio)
                            );
                        `;

                        // Agrega aquí las demás tablas siguiendo un patrón similar

                        db.transaction(tx => {
                            tx.executeSql(usuariosTable, [], (tx, result) => {
                            tx.executeSql(empresasTable, [], (tx, result) => {
                            tx.executeSql(clientesTable, [], (tx, result) => {
                            tx.executeSql(serviciosTable, [], (tx, result) => {
                            tx.executeSql(reservasTable, [], (tx, result) => {
                            tx.executeSql(promocionesTable, [], (tx, result) => {
                            tx.executeSql(notificacionesTable, [], (tx, result) => {
                            tx.executeSql(favoritosTable, [], (tx, result) => {
                                // Agrega aquí las demás ejecuciones de SQL para las tablas adicionales

                                resolve('Se crearon las tablas en ' + name);
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (favoritosTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (notificacionesTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (promocionesTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (reservasTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (serviciosTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (clientesTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (empresasTable) - Error: ' + error.message);
                            });
                            }, (error) => {
                                reject('Error al ejecutar la consulta SQL (usuariosTable) - Error: ' + error.message);
                            });
                        });
                    }
                })
                .catch(error => {
                    reject('Error al verificar la existencia de la base de datos - Error: ' + error);
                });
        });
    };


    updateUsuario = async (tabla, id, data) => {
        return new Promise((resolve, reject) => {
            const db = SQLite.openDatabase('agendate.db');

            // Generar la parte SET de la consulta SQL utilizando el objeto data
            const setClause = Object.keys(data).map(columna => `${columna} = ?`).join(', ');

            const updateQuery = `
                UPDATE ${tabla}
                SET ${setClause}
                WHERE ID = ?;
            `;

            const values = [...Object.values(data), id];

            db.transaction(tx => {
                tx.executeSql(updateQuery, values, (_, result) => {
                    resolve('Datos actualizados con éxito');
                }, (error) => {
                    reject('Error al actualizar datos - Error: ' + error.message);
                });
            });
        });
    }

    insertUsuario = async (db, id, username, name, lastName, password, document, email, userType) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Usuarios (ID, NombreUsuario, Nombre, Apellido, Contraseña, Documento, Correo, TipoUsuario, RecibeNotificaciones, Deleted)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            db.transaction(tx => {
                tx.executeSql(query, 
                    [id, username, name, lastName, password, document, email, userType, 1, 0], 
                (_, result) => {
                    resolve();
                }, (error) => {
                    reject('Error al insertar usuario - Error: ' + error.message);
                });
            });
        });
    };




    // Función para generar datos ficticios de prueba
    generateTestData = async () => {
        const db = SQLite.openDatabase('agendate.db');

        // Insertar usuarios
        // await this.insertUsuario(db, 1, 'admin', 'John', 'Snow', '0350MwGjTiI4C8O8o61/VA==', '098777000', 'jonsnow@example.com', 'customer');
        // await this.insertUsuario(db, 2, 'jose', 'Jose', 'Panadero', '0350MwGjTiI4C8O8o61/VA==', '9876543210', 'panaderia@example.com', 'company');
        // await this.insertUsuario(db, 3, 'pelu1', 'Ana', 'Gonzales', '0350MwGjTiI4C8O8o61/VA==', '54656543001', 'pelu1@example.com', 'company');
        // await this.insertUsuario(db, 4, 'abm', 'Jorge', 'Belloni', '0350MwGjTiI4C8O8o61/VA==', '50002543001', 'abm@example.com', 'company');
        // await this.insertUsuario(db, 5, 'sofi', 'Sofia', 'Rodriguez', '0350MwGjTiI4C8O8o61/VA==', '098888011', 'sofipelu@example.com', 'company');
        // await this.insertUsuario(db, 6, 'userX', 'User', 'Equiz', '0350MwGjTiI4C8O8o61/VA==', '545654888', 'userX@example.com', 'customer');

        // Insertar datos de prueba para Reservas y Servicios
        // await this.insertServicio(db, 2, 'Servicio de Panadería', '08:00', '18:00', 'Lunes;Martes;Miercoles;Jueves;Viernes;', 
        //     60, 'Panadería', 20.50, 'Ofrecemos una variedad de productos horneados.', '2023-01-15');
        // await this.insertServicio(db, 3, 'Corte de Cabello', '09:00', '19:00', 'Lunes;Martes;Miercoles;Jueves;Viernes;Sabado;', 
        //     45, 'Peluquería', 30.00, 'Corte de cabello moderno y personalizado.', '2023-01-20');

        // Simular algunas reservas
        await this.insertReserva(db, 1, 3, 'Realizada', '2024-01-15', '2023-01-15 10:30:00');
        await this.insertReserva(db, 1, 2, 'Pendiente', '2024-01-20', '2023-01-20 15:00:00');
        await this.insertReserva(db, 1, 2, 'Cancelada', '2024-01-18', '2023-01-18 12:45:00');
        await this.insertReserva(db, 1, 2, 'Pendiente', '2024-02-01', '2023-01-18 12:45:00');
    };


    insertServicio = async (db, empresaId, nombre, hIni, hFin, dias, turno, tipo, costo, descr, ultimaFecha) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Servicios (Empresa, Nombre, HoraInicio, HoraFin, DiasDefinidosSemana, 
                    DuracionTurno, TipoServicio, Costo, Descripcion, UltimaFecha, Deleted)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            db.transaction(tx => {
                tx.executeSql(query, 
                    [empresaId, nombre, hIni, hFin, dias, turno, tipo, costo, descr, ultimaFecha, 0], 
                (_, result) => {
                    resolve();
                }, (error) => {
                    reject('Error al insertar servicio - Error: ' + error.message);
                });
            });
        });
    };

    insertReserva = async (db, clienteId, servicioId, estado, fechaRealizada, fechaHoraReserva) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Reservas (Cliente, Servicio, Estado, FechaRealizada, FechaHoraReserva, Deleted)
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            db.transaction(tx => {
                tx.executeSql(query, 
                    [clienteId, servicioId, estado, fechaRealizada, fechaHoraReserva, 0], 
                (_, result) => {
                    resolve();
                }, (error) => {
                    reject('Error al insertar reserva - Error: ' + error.message);
                });
            });
        });
    };



    updateDatos = async (tabla, id, data) => {
        return new Promise((resolve, reject) => {
            const db = SQLite.openDatabase('agendate.db');

            // Generar la parte SET de la consulta SQL utilizando el objeto data
            const setClause = Object.keys(data).map(columna => `${columna} = ?`).join(', ');

            const updateQuery = `
                UPDATE ${tabla}
                SET ${setClause}
                WHERE ID = ?;
            `;

            const values = [...Object.values(data), id];

            db.transaction(tx => {
                tx.executeSql(updateQuery, values, (_, result) => {
                    resolve('Datos actualizados con éxito');
                }, (error) => {
                    reject('Error al actualizar datos - Error: ' + error.message);
                });
            });
        });
    }


    // reservas
    selectReservasCliente = (cliente) => {
		return new Promise((resolve, reject) => {
			const db = SQLite.openDatabase('agendate.db');
			const query = `SELECT * FROM Reservas R, Servicios S  
                WHERE R.Cliente = '${cliente}'
                AND R.Servicio = S.ID
            `;
			console.log(query);
			db.transaction(tx => {
				tx.executeSql(query, [], (txObj, resultSet) => {
					console.log('resultSet: ', JSON.stringify(resultSet));
					if (resultSet.rows.length > 0) {						
						resolve(resultSet.rows._array);
					} else {
						resolve(null);
					}
				}, (txObj, error) => {
					reject('Error Select User - ', error);
				});
			});
		});
	};

    // agenda
    selectReservasEmpresa = (empresa) => {
		return new Promise((resolve, reject) => {
			const db = SQLite.openDatabase('agendate.db');
			const query = `SELECT * FROM Reservas R, Servicios S  
                WHERE S.Empresa = '${empresa}'
                AND R.Servicio = S.ID
            `;
			console.log(query);
			db.transaction(tx => {
				tx.executeSql(query, [], (txObj, resultSet) => {
					console.log('resultSet: ', JSON.stringify(resultSet));
					if (resultSet.rows.length > 0) {						
						resolve(resultSet.rows._array);
					} else {
						resolve(null);
					}
				}, (txObj, error) => {
					reject('Error Select User - ', error);
				});
			});
		});
	};


    selectServiciosEmpresa = (empresa) => {
		return new Promise((resolve, reject) => {
			const db = SQLite.openDatabase('agendate.db');
			const query = `SELECT * FROM Servicios WHERE Empresa = '${empresa}' `;
			console.log(query);
			db.transaction(tx => {
				tx.executeSql(query, [], (txObj, resultSet) => {
					console.log('resultSet: ', JSON.stringify(resultSet));
					if (resultSet.rows.length > 0) {						
						resolve(resultSet.rows._array);
					} else {
						resolve(null);
					}
				}, (txObj, error) => {
					reject('Error Select User - ', error);
				});
			});
		});
	};


    openDb = async (name) => {
        try {
            this.db = await SQLite.openDatabase(name+'.db');
            return true
        } catch (error) {
            return false;
        }
    }

    closeDb = async () => {
        await this.db.closeDb();
    }

    selectTable = async (table) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM '+table, null, 
                    (txObj, resultSet) => setNames(resultSet.rows._array),
                    (txObj, error) => console.log(error)
                );
            });
        });
    }
}

export default new SQLiteHandler();