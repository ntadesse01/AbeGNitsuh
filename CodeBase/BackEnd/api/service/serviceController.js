 // import empolyee routes
 import prisma from "../../config/prisma.js";
 import serviceSchema from "./serviceSchema.js"; 
 const serviceController = {
    register: async (req, res) => {
      try {
         //validate the request body using zod schema
        const validatedDate = serviceSchema.register.parse(req.body);

         //check if the service already exists  
          const serviceExists = await prisma.common_services.findFirst({
                where: {
                    service_name: validatedDate.service_name,
                }
          });
         if (serviceExists){
            return res.status (403).json({
               message: "service already exists!",
               success: false,
            });
         }
        
           // Insert the new service into the database
       const newService = await prisma.common_services.create({
         data: {
          service_name: validatedData.service_name,
           service_description: validatedData.service_description,
         },
       });
 
       // Success response
       return res.status(201).json({
         message: "Service Registered Successfully!",
         success: true,
         data: newService,
       });
     } catch (error) {
       return res.status(400).json({
         message: error.message,
         success: false,
       });
     }
   },

   update: async (req, res) => {
      try {
        // Validate the request body using Zod schema
        const validatedData = serviceSchema.update.parse(req.body);
   
// Check if a service exists by service_id
const existingService = await prisma.service.findFirst({
  where: {
    service_id: req.params.id,  
  }
});

if (!existingService) {
  return res.status(404).json({
    error: "Service not found"
  });
}

        // Update the service information
        const serviceId = parseInt(req.params.id);
        const updatedService = await prisma.common_services.update({
          where: { id: serviceId },
          data: {
            service_name: validatedData.service_name,
            service_description: validatedData.service_description,
          },
        });
  
        return res.status(200).json({
          message: "Service Updated Successfully!",
          success: true,
          data: updatedService,
        });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
          success: false,
        });
      }
    },
  
    getAll: async (req, res) => {
      try {
        // Fetch all services
        const services = await prisma.common_services.findMany();
        return res.status(200).json({
          success: true,
          data: services,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    },
    
    getSingle: async (req, res) => {
      try {
        // Fetch a single service by ID
        const serviceId = parseInt(req.params.id);
        const service = await prisma.common_services.findUnique({
          where: { id: serviceId },
        });
    
        if (!service) {
          return res.status(404).json({
            message: "Service Not Found",
            success: false,
          });
        }
    
        return res.status(200).json({
          success: true,
          data: service,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    },
    
    delete: async (req, res) => {
      try {
        // Delete a service by ID
        const serviceId = parseInt(req.params.id);
        await prisma.common_services.delete({
          where: { id: serviceId },
        });
    
        return res.status(200).json({
          message: "Service Deleted Successfully!",
          success: true,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    }}
    export default serviceController;
    






 //  register: (req, res) => {},
//     update : (req,res) => {},
//     getAll : (req,res) => {},
//     getSingle : (req, res) => {},
//     delete : (req, res) => {},