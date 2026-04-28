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
const addUsers = (username, email, password) => {
    if(!username || !email || !password) {
        console.log("Faltan datos para crear el usuario! Asegurate de ingresar username, email y password")
        return
    }else{
        const q= 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(q, [username, email, password], (err, results) => {
        if(err) {
            console.log("Error al crear el usuario: ", err)
        } else {
            console.log("Usuario creado con exito!: ", results)
        }
 
    })
    }

}
    
//Actualizar usuarios - node index.js update <username> <email> <password> <id>
const updateUsers = (username, email, password, id) => {
    if(!username || !email || !password || !id) {
        console.log("Faltan datos para poder actualizar el usuario! Debes enviar el username, email, password y el ID")
    }
    else{
        const q= 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    db.query(q, [username, email, password, id], (err, results) => {
        if(err) {
            console.log("Error al actualizar el usuario: ", err)
        } else {
            if(results.affectedRows === 0) {
                console.log("No se encontró un usuario con ese ID para actualizar")
            }else{
                console.log("Usuario actualizado con exito!: ", results)
            }
        }
        });

    }
}

// Eliminar usuarios - node index.js delete <id>
const deleteUsers = (idDelete) => {
    if(!idDelete) {
        console.log ("Debes ingresar el ID para eliminar un usuario!")
    }else{
        const q = 'DELETE FROM users WHERE id = ?';
        db.query(q, [idDelete], (err,results) =>{
            if (err) {
                console.log("Error al eliminar el usuario: ", err)
            }else{
                if(results.affectedRows === 0) {
                    console.log("No se encontró un usuario con ese ID para eliminar")
                }else{
                    console.log("Usuario eliminado con exito!: ", results)
                }
            }
        })
    }
}


export {getUsers, addUsers, updateUsers, deleteUsers}