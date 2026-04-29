import { getUsers, addUsers, updateUsers, deleteUsers} from "./controllers.js"
const args = process.argv 
const params = args.slice(2)
const operacion = params[0]
const username= params[1]
const email= params[2]
const password= params[3]
const operacionesValidas = ["get", "add", "update", "delete"]

if(!operacionesValidas.includes(operacion)) {
    console.log(`
        No se pudo realizar la peticion!
        ----------------------
        Operaciones permitidas:
        - get
        - add
        - update
        - delete
        -----------------------
        Intentalo nuevamente!
    `);
} 
else{
    switch(operacion) {
        case "get":
            getUsers()
            break
        case "add":
            addUsers(username, email, password)
            break
        case "update":
            const id = params[4]
            updateUsers(username, email, password, id)
            break
        case "delete":
            const idDelete = params[1]
            deleteUsers(idDelete)
            break 
    }
}   

