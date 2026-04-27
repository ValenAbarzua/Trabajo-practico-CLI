//Funcionalidades
import {db} from './config.js';

//Obtener usuarios - node index.js get 
const getUsers = () => {
    db.query("SELECT * FROM users", (err, results) => {
        if(err) {
            console.log("Error al obtener los usuarios: ", err)
        } else {
            console.log("Usuarios obtenidos: ", results)
        }
    })
}


//Crear usuarios - node index.js add <username> <email> <password>
const addUsers = () => {
    db.query("CREATE TABLE")
}


//Actualizar usuarios - node index.js update <username> <email> <password> <id>

// Eliminar usuarios - node index.js delete <id>

export {getUsers}