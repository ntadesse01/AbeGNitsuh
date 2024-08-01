// import validation 
import {z} from "zod";
const CustomerSchema = {
register: z.object({
   "customer_email": z.string().email(),
    "customer_phone_number": z.string(),
    "customer_first_name": z.string(),
   "customer_last_name": z.string(),
    "customer_hash": z.string(),
   "active_customer_status" : z.string(),
    "customer_added_date": z.string(),
   
}),
    updated: z.object({
        customer_email: z.string().email().optional(),
        customer_phone_number: z.string().optional(),
        customer_first_name: z.string().optional(),
        customer_last_name: z.string().optional(),
        active_customer_status: z.string().optional(),
})
};
export default CustomerSchema;

// This schema is used to validate the data for updating an existing customer's information.

// customer_email: Must be a valid email address if provided.
// customer_phone_number: Must be a string if provided.
// customer_first_name: Must be a string if provided.
// customer_last_name: Must be a string if provided.
// active_customer_status: Must be a string if provided.


//  {
//     "customer_id": 1,
//     "customer_email": "test@test.com",
//     "customer_phone_number": "555-555-5555",
//     "customer_first_name": "Test",
//     "customer_last_name": "Test",
//     "customer_hash": "khsdgfkujhkjnfdfg7763hdff",
//     "active_customer_status": 1,
//     "customer_added_date": "2016-11-28T14:10:11.338Z"
//   },