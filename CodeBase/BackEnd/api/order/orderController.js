import orderSchema from "./orderSchema.js";
import prisma from "../../config/prisma.js";

const orderController = {
  register: async (req, res) => {
    try {
      // Validate using zod
      orderSchema.register.parse(req.body);

      // Check if an order with the same order_hash already exists
      const existingOrder = await prisma.orders.findUnique({
        where: { order_hash: req.body.order_hash },
      });

      if (existingOrder) {
        return res.status(403).json({
          message: "Order with this hash already exists!",
          success: false,
        });
      }
// Check if an employee exists/ employe_id 
const existingEmployee = await prisma.employee.findFirst({
  where: { id: + employee_id }
});
if (!existingEmployee) {
  return res.status(403).json({
    message: "Employee not found",
    success: false
  });
}
//check if customer exists / customer_id 
const existingCustomer = await prisma.customer.findFirst({
  where: { id: +customer_id }
});
if (!existingCustomer) {
  return res.status(403).json({
    message: "Customer not found",
    success: false
  });
}
// check if vehicle exists / vehicle_id
const existingVehicle = await prisma.vehicle.findFirst({
  where: { id: +vehicle_id }
});
if (!existingVehicle) {
  return res.status(403).json({
    message: "Vehicle not found",
    success: false
  });
}
// check if service exists / service_id
const existingService = await prisma.service.findFirst({
  where: { id: +service.service_id }
});
if (!existingService) {
  return res.status(403).json({
    message: `Service not found`,
    success: false
  });
}
      
      // Create a new order
      const newOrder = await prisma.orders.create({
        data: {
          employee_id: req.body.employee_id,
          customer_id: req.body.customer_id,
          vehicle_id: req.body.vehicle_id,
          active_order: req.body.active_order,
          order_hash: req.body.order_hash,
          order_info: {
            create: {
              order_total_price: req.body.order_total_price,
              estimated_completion_date: req.body.estimated_completion_date,
              completion_date: req.body.completion_date,
              additional_request: req.body.additional_request,
              notes_for_internal_use: req.body.notes_for_internal_use,
              notes_for_customer: req.body.notes_for_customer,
              additional_requests_completed: req.body.additional_requests_completed,
            },
          },
          order_services: {
            create: req.body.orderServices.map((service) => ({
              service_id: service.serviceId,
              service_completed: service.serviceCompleted,
            })),
          },
          order_status: {
            create: {
              order_status: req.body.orderStatus,
            },
          },
        },
        include: {
          order_info: true,
          order_services: true,
          order_status: true,
        },
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      // Handle any errors that occurred during the creation process
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all orders
  getAll: async (req, res) => {
    try {
      // Fetch all orders from the orders table
      const orders = await prisma.orders.findMany({
        include: {
          order_info: true,
          order_services: true,
          order_status: true,
          customer: true,
          employee: true,
          vehicle: true,
        },
      });

      return res.status(200).json({
        message: "Fetch Completed!",
        success: true,
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },

  // Get a single order
  getSingle: async (req, res) => {
    try {
      const orderId = req.params.id;
      // Fetch a single order by its ID from the orders table
      const order = await prisma.orders.findFirst({
        where: {
          id: +orderId,
        },
        include: {
          employee: true,
          customer: true,
          vehicle: true,
          order_info: true,
          order_services: true,
          order_status: true,
        },
      });

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
          success: false,
        });
      }

      // Success response
      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      // Error response
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },

  // Update an order
  update: async (req, res) => {
    try {
      // Validate using zod or validate the request body using the zod schema
      orderSchema.update.parse(req.body);

      const orderId = req.params.id;
// check if order existes / order_id / from order table 

const orderExist = await prisma.orders.findFirst({
  where: {
    id: +orderId 
  }
})
if (!orderExist){
  return res.status(404).json({
    message: "order not exisit",
    success: false,
  })
}


 
// Check if an employee exists by employee_id
const existingEmployee = await prisma.employee.findUnique({
  where: {
    employee_id: req.body.employee_id,
  }
});
if (!existingEmployee) {
  return res.status(404).json({
    error: "Employee not found"
  });
}

// Check if a customer exists by customer_id
const existingCustomer = await prisma.customer.findUnique({
  where: {
    customer_id: req.body.customer_id,
  }
});
if (!existingCustomer) {
  return res.status(404).json({
    error: "Customer not found"
  });
}
 
// Check if a vehicle exists by vehicle_id
const existingVehicle = await prisma.vehicle.findUnique({
  where: {
    vehicle_id: req.body.vehicle_id,
  }
});
if (!existingVehicle) {
  return res.status(404).json({
    error: "Vehicle not found"
  });
}
 
// Check if a service exists by service_id
const existingService = await prisma.service.findUnique({
  where: {
    service_id: req.body.service_id,
  }
});
if (!existingService) {
  return res.status(404).json({
    error: "Service not found"
  });
}
      // Update the order information in the orders table
      const updatedOrder = await prisma.orders.update({
        where: {
          id: +req.params.id,
        },
        data: {
          employee_id: req.body.employee_id,
          customer_id: req.body.customer_id,
          vehicle_id: req.body.vehicle_id,
          active_order: req.body.active_order,
          order_hash: req.body.order_hash,
          order_info: {
            update: {
              order_total_price: req.body.order_total_price,
              estimated_completion_date: req.body.estimated_completion_date,
              completion_date: req.body.completion_date,
              additional_request: req.body.additional_request,
              notes_for_internal_use: req.body.notes_for_internal_use,
              notes_for_customer: req.body.notes_for_customer,
              additional_requests_completed: req.body.additional_requests_completed,
            },
          },
          order_services: {
            upsert: req.body.orderServices.map((service) => ({
              where: { service_id: service.serviceId },
              update: { service_completed: service.serviceCompleted },
              create: {
                service_id: service.serviceId,
                service_completed: service.serviceCompleted,
              },
            })),
          },
          order_status: {
            update: {
              order_status: req.body.orderStatus,
            },
          },
        },
        include: {
          order_info: true,
          order_services: true,
          order_status: true,
        },
      });

      // Success response
      return res.status(201).json({
        message: "Order Updated Successfully!!",
        success: true,
        data: updatedOrder,
      });
    } catch (error) {
      // Error response
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
};

export default orderController;
