
import { z } from "zod";
const serviceSchema = z.object({
  register: z.object({
    service_id: z.string(),
    service_name: z.string(),
    service_description: z.string(),
  }),

  // update:: This indicates that you are defining a schema for updating service information.
  update: z.object({
    service_name: z.string().optional(),
    service_description: z.string().optional(),
  }),
});

export default serviceSchema;

 