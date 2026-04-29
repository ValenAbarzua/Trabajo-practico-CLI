# Trabajo Práctico: CLI de Gestión de Usuarios con Node.js y MySQL

Esta es una aplicacion de linea de comandos (CLI) desarrollada con Node.js que permite gestionar usuarios en una base de datos MySQL.

---

## 1. Tecnologias utilizadas

* Node.js
* JavaScript
* MySQL
* XAMPP
* mysql2

---

## 2. Estructura del proyecto

* `index.js`: Punto de entrada de la aplicacion donde se procesan los argumentos de la CLI.
* `controllers.js`: Contiene la lógica de las operaciones (CRUD).
* `config.js`: Configuración de la conexion a la base de datos.
* `scripts/create_users.sql`: Script para crear la base de datos y la tabla.
* `package.json`: Dependencias del proyecto.

---

## 3. Configuración inicial

### 3.1 Inicialización del proyecto

Si se quiere crear el proyecto desde cero:

```bash
npm init -y
```

Esto genera el archivo `package.json`.

---

### 3.2 Instalación de dependencias

Instalar el driver de MySQL:

```bash
npm install mysql2
```

O bien, si el proyecto ya esta clonado:

```bash
npm install
```

---

### 3.3 Configuración de la base de datos

Asegurarse de tener MySQL ejecutandose (desde XAMPP).

Luego ejecutar el script:

```bash
mysql -u root -p < scripts/create_users.sql
```

Esto creará:

* Base de datos: `cli_crud`
* Tabla: `users`


## 4. Funcionamiento general

La aplicación se ejecuta desde la terminal mediante el siguiente comando:

```bash
node index.js <operacion> [parametros]
```

Las operaciones disponibles son:

* `get`
* `add`
* `update`
* `delete`

---

## 5. Comandos disponibles

### 5.1 Obtener usuarios

```bash
node index.js get
```

Muestra todos los usuarios registrados en la base de datos.

---

### 5.2 Crear usuario

```bash
node index.js add <username> <email> <password>
```

Ejemplo:

```bash
node index.js add valentina vale@gmail.com valentina1234
```

Validaciones:

* Todos los campos son obligatorios
* El email debe tener formato `@gmail.com`
* La contraseña debe tener al menos 10 caracteres

---

### 5.3 Actualizar usuario

```bash
node index.js update <username> <email> <password> <id>
```

Ejemplo:

```bash
node index.js update valentina vale2@gmail.com abarzua123456 1
```

---

### 5.4 Eliminar usuario

```bash
node index.js delete <id>
```

Ejemplo:

```bash
node index.js delete 1
```

---

## 6. Notas extra

* Las contraseñas se muestran como forma de practica, en un entorno real no se deberian visualizar.
* La conexión a la base de datos se cierra manualmente después de cada operación.

---

## 7. Detalles tecnicos

* Se utiliza `process.argv` para capturar los argumentos desde la terminal.
* Se implementa un `switch` para manejar las operaciones.
* Se utiliza `mysql2` con pool de conexiones.
* Se aplican validaciones en la creación de usuarios.

---

## 8. Autor

Valentina Abarzua
