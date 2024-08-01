 import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js"
//import employee routes
 import customerSchema from "./customerSchema.js";
  const customerController = {
    register: async(req, res) => { 
      try {  
   // validate using zod 
  const validation = customerSchema.register.parse(req.body); //check if email alredy exisits 
   const customerExists = await prisma.customer_identifier.findFirst({
      where:{
         customer_email:req.body.customer.customer_email,
      }
   });

      if (customerExists){
         return res.status (403).json({
            message: "Email is already registerd!",
            success: false,
         });
      }
  
   const customer_Exists = await prisma.customer_identifier.findFirst({
    where:{customer_phone_number:req.body.customer_phone_number
      },
   })
   if (customer_Exists){
    return res.status(403).json({
      message: "customer Phone nuber alredy existed!",
      succues:false
    })
   }
   
    //Insert into the table
     const newCustomer = await prisma.customer_identifier.create ({
      data: {
        customer_email:req.body.customer_email,
        customer_phone_number:req.body.customer_phone_number,
        customer_hash:"1",
        customer:{
          create:{
            customer_first_name:req.body.customer_first_name,
            customer_last_name:req.body.customer_last_name,
            active_customer_status:req.body.active_customer_status,
          }
        }     
        },
         
     });
      // Success response
      return res.status(201).json({
         message: "Customer Registered Successfully!!",
         success: true,
         data: newCustomer,
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
        // Fetch all customers
        const customers = await prisma.customer_identifier.findMany({
          include:{
            customer:true,
          }
        });
        return res.status(200).json({
          message: "fetch are complited!",
          success: true,
          data: customers
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
        // Fetch a single customer by ID
        const customerId = req.params.id;
        const customer = await prisma.customer_identifier.findFirst({
          where: {
            customer_id: + (customerId),
          },
        });
  
        if (!customer) {
          return res.status(404).json({
            message: "Customer not found",
            success: false,
          });
        }
  
        return res.status(200).json({
          success: true,
          data: customer,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    },
    update: async (req, res) => {
      try {
        // Validate using zod (assuming there is a schema for updating customers)
        customerSchema.updated.parse(req.body);
        //check if the customer exists 
        const existingCustomer  = await prisma.customer_identifier.findUnique({
          where:{
            customer_email:req.body.customer_email,
          },
          include:{
            customer_info:true
          }
        });
        if(!existingCustomer){
          //if the customer doesn't exist, return an appropriate error response.
          return res.status (404).json({
            error: "Customer not fund"
          });
        }

        //if the custoemr exists, update their information
        const updatedCustomer = await prisma.customer_identifier.update({
          where: {id:existingCustomer.id},
          data:{
  // Update the customer's information based on the request body
  //where do i get the information?  // You can access the customer_info data through existingCustomer.customer_info.
            customer_info:{
              update:{
                customer_first_name:req.body.customer_first_name,
                customer_last_name:req.body.customer_first_name,
                active_customer_status:req.body.active_customer_status,
                
              }
            }
          },
          include:{
            customer: true 
          }
        });
  //retrun the updated customer information 
 
        return res.status(200).json({
          message: "Customer Updated Successfully!!",
          success: true,
          data: updatedCustomer,
        });
      } catch (error) {
        //handle any errors that occurred during the update process
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    },
  };
  
  export default customerController;
 

 


 