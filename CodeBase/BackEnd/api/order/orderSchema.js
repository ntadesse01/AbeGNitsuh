import { z } from "zod";

const orderSchema = z.object({
  register: z.object({
    order_id: z.string(),
    employee_id: z.string(),
    customer_id: z.string(),
    order_description: z.string(),
    order_date: z.string(),
    estimated_completion_date: z.string(),
    completion_date: z.string(),
    order_completed: z.boolean(),
    order_services: z.string(),
  }),

  // update:: This is a key within the orderSchema object. It indicates that you are defining validation rules specifically for the update operation of an order. This typically corresponds to how data should be structured when updating an existing order record.

  update: z.object({
    employee_id: z.string().optional(),
    customer_id: z.string().optional(),
    vehicle_id: z.string().optional(),
    active_order: z.boolean().optional(),
    order_hash: z.string().optional(),
    order_total_price: z.number().optional(),
    estimated_completion_date: z.string().optional(),
    completion_date: z.string().optional(),
    additional_request: z.string().optional(),
    notes_for_internal_use: z.string().optional(),
    notes_for_customer: z.string().optional(),
    additional_requests_completed: z.boolean().optional(),
    orderServices: z.array(z.object({
      serviceId: z.string(),
      serviceCompleted: z.boolean(),
    })).optional(),
    orderStatus: z.string().optional(),
  }),
});

export default orderSchema;


 