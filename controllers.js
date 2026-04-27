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


//Crear usuarios - node index.js add <id> <username> <email> <password>
const addUsers = (id, username, email, password) => {
    const q= 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
    db.query(q, [id, username, email, password], (err, results) => {
        if(err) {
            console.log("Error al crear el usuario: ", err)
        } else {
            console.log("Usuario creado con exito!: ", results)
        }
 
    })
}


//Actualizar usuarios - node index.js update <username> <email> <password> <id>

// Eliminar usuarios - node index.js delete <id>

export {getUsers, addUsers}