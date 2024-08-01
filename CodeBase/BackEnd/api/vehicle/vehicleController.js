 
 import prisma from "../../config/prisma.js"
import vehicleSchema from "./vehicleSchema.js"
const vehicleController = {
    register: async (req, res) => {
      try {
        // Validate the request body using vehicleSchema
        vehicleSchema.register.parse(req.body);
  
        // Check if the vehicle with the same license plate already exists in the database
        const existingVehicle = await prisma.customer_vehicle_info.findFirst({
          where: { vehicle_tag: req.body.vehicle_tag },
        });
  
        if (existingVehicle) {
          return res.status(403).json({
            message: "License Plate Already in Use!",
            success: false,
          });
        }
  
        // Create a new vehicle
        const newVehicle = await prisma.customer_vehicle_info.create({
          data: {
            customer_id: req.body.customer_id,
            vehicle_year: req.body.vehicle_year,
            vehicle_make: req.body.vehicle_make,
            vehicle_model: req.body.vehicle_model,
            vehicle_type: req.body.vehicle_type,
            vehicle_mileage: req.body.vehicle_mileage,
            vehicle_tag: req.body.vehicle_tag,
            vehicle_color: req.body.vehicle_color,
          },
        });
  
        return res.status(200).json({
          message: "Vehicle registered successfully!",
          success: true,
          data: newVehicle,
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
        // Validate the request body using vehicleSchema
        vehicleSchema.update.parse(req.body);
  
      // Check if a vehicle exists by vehicle_id
const existingVehicle = await prisma.vehicle.findFirst({
  where: {
    vehicle_id: req.params.id,  
  }
});

if (!existingVehicle) {
  return res.status(404).json({
    error: "Vehicle not found"
  });
}
        
        // Extract vehicle ID from request parameters
        const vehicleId = parseInt(req.params.id);
  
        // Update the vehicle information
        const updatedVehicle = await prisma.customer_vehicle_info.update({
          where: { id: vehicleId },
          data: {
            vehicle_year: req.body.vehicle_year,
            vehicle_make: req.body.vehicle_make,
            vehicle_model: req.body.vehicle_model,
            vehicle_type: req.body.vehicle_type,
            vehicle_mileage: req.body.vehicle_mileage,
            vehicle_tag: req.body.vehicle_tag,
            vehicle_color: req.body.vehicle_color,
          },
        });
  
        return res.status(200).json({
          message: "Vehicle updated successfully!",
          success: true,
          data: updatedVehicle,
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
        // Fetch all vehicles
        const vehicles = await prisma.customer_vehicle_info.findMany();
  
        return res.status(200).json({
          success: true,
          data: vehicles,
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
        // Extract vehicle ID from request parameters
        const vehicleId = parseInt(req.params.id);
  
        // Fetch a single vehicle by ID
        const vehicle = await prisma.customer_vehicle_info.findUnique({
          where: { id: vehicleId },
        });
  
        if (!vehicle) {
          return res.status(404).json({
            message: "Vehicle Not Found",
            success: false,
          });
        }
  
        return res.status(200).json({
          success: true,
          data: vehicle,
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
        // Extract vehicle ID from request parameters
        const vehicleId = parseInt(req.params.id);
  
        // Delete a vehicle by ID
        await prisma.customer_vehicle_info.delete({
          where: { id: vehicleId },
        });
  
        return res.status(200).json({
          message: "Vehicle Deleted Successfully!",
          success: true,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    },
  };
  
  export default vehicleController;