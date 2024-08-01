import {Router} from "express"
const appRoute = Router ()
import employeeRoute from "../api/employee/employeeRoute.js"
import customerRoute from "../api/customer/customerRoute.js"
import orderRoute from "../api/order/orderRoute.js"
import vehicleRoute from "../api/vehicle/vehicleRoute.js"
appRoute.use("/employee",employeeRoute)
appRoute.use("/customer",customerRoute)
appRoute.use ("/order",orderRoute)
appRoute.use ("/vehicle",vehicleRoute) 

export default appRoute



