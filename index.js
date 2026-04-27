import { getUsers, addUsers } from "./controllers.js"
const args = process.argv 
const params = args.slice(2)
const operacion = params[0]
const id= params[1]
const username= params[2]
const email= params[3]
const password= params[4]
const operacionesValidas = ["get", "add", "update", "delete"]

if(!operacionesValidas.includes(operacion)) {
    console.log("No es valida tu peticion! Prueba con get, add, update o delete")
} 
else{
    switch(operacion) {
        case "get":
            getUsers()
            break
        case "add":
            addUsers(id, username, email, password)
            break
    }  
}

