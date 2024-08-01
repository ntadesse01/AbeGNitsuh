import { z } from "zod";

const vehicleSchema = {
  register: z.object({
    customer_id: z.string(),
    vehicle_make: z.string(),
    vehicle_model: z.string(),
    vehicle_type: z.string(),
    vehicle_mileage: z.number(),
    vehicle_tag: z.string(),
    vehicle_serial: z.string(),
    vehicle_color: z.string(),
  }),


  // update: This is the name given to the Zod schema object. It indicates that this schema is specifically for validating update requests.
  update: z.object({
    customer_id: z.string().optional(),
    vehicle_year: z.string().optional(),
    vehicle_make: z.string().optional(),
    vehicle_model: z.string().optional(),
    vehicle_type: z.string().optional(),
    vehicle_mileage: z.number().optional(),
    vehicle_tag: z.string().optional(),
    vehicle_color: z.string().optional(),
  }),
};

export default vehicleSchema;

 