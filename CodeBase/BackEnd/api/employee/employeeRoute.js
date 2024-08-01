import { Router } from "express"; 
const employeeRoute = Router ()
import employeeController from "./employeeController.js"


employeeRoute.post ("/", employeeController.register)
employeeRoute.put ("/", employeeController.update)
employeeRoute.get ("/:id", employeeController.getSingle)
employeeRoute.get ("/", employeeController.getAll)
employeeRoute.delete ("/:id", employeeController.delete)

export default employeeRoute



