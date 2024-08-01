import { Router } from "express"; 
const orderRoute = Router ()
import orderController from "./orderController.js";
orderRoute.post ("/", orderController.register)
orderRoute.put ("/", orderController.update)
orderRoute.get ("/:id", orderController.getSingle)
orderRoute.get ("/", orderController.getAll)


export default orderRoute

