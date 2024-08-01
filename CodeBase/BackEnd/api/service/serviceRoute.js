import { Router } from "express"; 
const serviceRoute = Router ()
import serviceController from "./serviceController.js";
serviceRoute.post ("/", serviceController.register)
serviceRoute.put ("/", serviceController.update)
serviceRoute.get ("/:id", serviceController.getSingle)
serviceRoute.get ("/", serviceController.getAll)


export default serviceRoute



