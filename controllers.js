//Funcionalidades del trabajo
import {db} from './config.js';

//Obtener usuarios - node index.js get 
//Al llamar esta funcion podras obtener todos los usuarios que se encuentran en la base de datos,
//  mostrando su id, username, email y password.
const getUsers = () => {
    db.query("SELECT * FROM users", (err, results) => {
        if(err) {
            console.log("Ocurrio un error al obtener los usuarios: ", err)
        } else {
            console.log("Usuarios obtenidos: ")
            console.table(results) // Nota: en un entorno real no se debería mostrar la contraseña en la salida.
            db.end() // Cerramos la conexión y finalizamos el proceso para que la CLI no quede colgada
            process.exit(0)
        }
    })
}


//Crear usuarios - node index.js add <username> <email> <password>
//Al llamar esta funcion podras crear un nuevo usuario, ingresando su username, email y password.
const addUsers = (username, email, password) => {
    if(!username || !email || !password) {
        console.log("Faltan datos para crear el usuario! Asegurate de ingresar username, email y password")
        return
    }else{
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if(!emailRegex.test(email)) { //Validacion de mail
            console.log("El formato del email no es válido")
            return
        }
        if(password.length < 10) { //Validacion de password
            console.log("La contraseña debe tener al menos 10 caracteres")
            return
        }

        const q= 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(q, [username, email, password], (err, results) => {
        if(err) {
            console.log("Error al crear el usuario: ", err)
        } else {
            console.log(`
                Nuevo usuario creado:
                ----------------------
                ID: ${results.insertId}
                Usuario: ${username}
                Email: ${email}
            `);
            db.end()
            process.exit(0)
        }
 
    })
    }

}
    
//Actualizar usuarios - node index.js update <username> <email> <password> <id>
//Al llamar esta funcion podras actualizar un usuario existente, ingresando su username,
// email, password y el ID del usuario que deseas actualizar.
const updateUsers = (username, email, password, id) => {
    if(!username || !email || !password || !id) {
        console.log("Faltan datos para poder actualizar el usuario! Recorda enviar username, email, password y el ID")
    }
    else{
        const q= 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    db.query(q, [username, email, password, id], (err, results) => {
        if(err) {
            console.log("Error al actualizar el usuario: ", err)
        } else {
            if(results.affectedRows === 0) { // Si affectedRows === 0 significa que no existe un usuario con ese ID
                console.log("No se encontró un usuario con ese ID para actualizar")
                process.exit(0)
            }else{
                console.log(`
                Usuario actualizado:
                ----------------------
                ID: ${id}
                Usuario: ${username}
                Email: ${email}
            `);
                db.end()
                process.exit(0)
            }
        }
        });

    }
}

// Eliminar usuarios - node index.js delete <id>
// Al llamar esta funcion podras eliminar un usuario existente, ingresando el ID
//  del usuario que deseas eliminar.
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
                    process.exit(0)
                }else{
                    console.log(`
                        Usuario eliminado:
                        ----------------------
                        ID: ${idDelete}
                    `)
                    db.end()
                    process.exit(0)
                }
            }
        })
    }
}


export {getUsers, addUsers, updateUsers, deleteUsers}