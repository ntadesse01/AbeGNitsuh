import { Router } from "express"; 
const vehicleRoute = Router ()
import vehicleController from "./vehicleController.js";
vehicleRoute.post ("/", vehicleController.register)
vehicleRoute.put ("/", vehicleController.update)
vehicleRoute.get ("/:id", vehicleController.getSingle)
vehicleRoute.get ("/", vehicleController.getAll)


export default vehicleRoute
