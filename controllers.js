//Funcionalidades del trabajo
import { db } from './config.js';

//Obtener usuarios - node index.js get
//Con esta funcion obtenemos todos los usuarios de la base de datos y los mostramos en consola. 
// Si ocurre un error, se muestra un mensaje de error.
const getUsers = async () => {
  try {
    const [results] = await db.promise().query("SELECT * FROM users");
    console.log("Usuarios obtenidos:");
    console.table(results);
    db.end();
    process.exit(0);
  } catch (err) {
    console.log("Ocurrio un error al obtener los usuarios:", err);
    process.exit(1);
  }
};

//Crear usuarios - node index.js add <username> <email> <password>
//Se crea un nuevo usuario en la base de datos validando los datos ingresados.
// Si los datos son correctos, se inserta el nuevo usuario en la base de datos y se 
// muestra un mensaje de confirmación. Si ocurre un error, se muestra un mensaje de error.
const addUsers = async (username, email, password) => {
  if (!username || !email || !password) {
    console.log("Faltan datos para crear el usuario! Asegurate de ingresar username, email y password");
    return;
  } else {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      console.log("El formato del email no es valido");
      return;
    }
    if (password.length < 10) {
      console.log("La contraseña debe tener al menos 10 caracteres");
      return;
    }

    try {
      const q = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      const [results] = await db.promise().query(q, [username, email, password]);
      console.log(`
        Nuevo usuario creado:
        ----------------------
        ID: ${results.insertId}
        Usuario: ${username}
        Email: ${email}
      `);
      db.end();
      process.exit(0);
    } catch (err) {
      console.log("Error al crear el usuario:", err);
      process.exit(1);
    }
  }
};

//Actualizar usuarios - node index.js update <username> <email> <password> <id>
//Se actualiza un usuario existente en la base de datos validando los datos ingresados y el ID del usuario
// a actualizar.
const updateUsers = async (username, email, password, id) => {
  if (!username || !email || !password || !id) {
    console.log("Faltan datos para poder actualizar el usuario! Recorda enviar username, email, password y el ID");
  } else {
    try {
      const q = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
      const [results] = await db.promise().query(q, [username, email, password, id]);

      if (results.affectedRows === 0) {
        console.log("No se encontró un usuario con ese ID para actualizar");
        process.exit(0);
      } else {
        console.log(`
          Usuario actualizado:
          ----------------------
          ID: ${id}
          Usuario: ${username}
          Email: ${email}
        `);
        db.end();
        process.exit(0);
      }
    } catch (err) {
      console.log("Error al actualizar el usuario:", err);
      process.exit(1);
    }
  }
};

//Eliminar usuarios - node index.js delete <id>
//Se elimina un usuario existente en la base de datos validando el ID del usuario a eliminar.
const deleteUsers = async (idDelete) => {
  if (!idDelete) {
    console.log("Debes ingresar el ID para eliminar un usuario!");
  } else {
    try {
      const q = 'DELETE FROM users WHERE id = ?';
      const [results] = await db.promise().query(q, [idDelete]);

      if (results.affectedRows === 0) {
        console.log("No se encontro un usuario con ese ID para eliminar");
        process.exit(0);
      } else {
        console.log(`
          Usuario eliminado:
          ----------------------
          ID: ${idDelete}
        `);
        db.end();
        process.exit(0);
      }
    } catch (err) {
      console.log("Error al eliminar el usuario:", err);
      process.exit(1);
    }
  }
};

export { getUsers, addUsers, updateUsers, deleteUsers };