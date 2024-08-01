// import validation 
import {z} from "zod";
const empolyeeSchema = {
register: z.object({
    "employee_email": z.string().email(),
    "employee_first_name": z.string(),
    "employee_last_name": z.string(),
    "employee_phone": z.string(),
    // "active_employee":z.number(),
    "employee_password":z.string().min(6),
    "company_role_id":z.number()
}),

updated: z.object({
    employee_email: z.string().email().optional(),
    employee_first_name: z.string().optional(),
    employee_last_name: z.string().optional(),
    employee_phone: z.string().optional(),
    // active_employee: z.number().optional(),
  }),
};
export default empolyeeSchema;







 
//assignments
//prepare validation for employee, customer, order, vehicle, service  
// finalized customer, order, vehicle, service, finished route. 