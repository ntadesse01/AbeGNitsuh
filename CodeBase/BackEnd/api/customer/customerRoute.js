import { Router } from "express"; 
const customerRoute = Router ()
import customerController from "./customerController.js"

customerRoute.get ("/:id", customerController.getSingle)
customerRoute.get ("/", customerController.getAll)
customerRoute.post ("/", customerController.register)
customerRoute.put ("/", customerController.update)

export default customerRoute




 
 
 