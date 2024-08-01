import bcrypt from "bcrypt"
import prisma from "../../config/prisma.js"
// import empolyee routes
import empolyeeSchema from "./employeeSchema.js"; 

const employeeController = {
   register: async (req, res) => {
    try {
      // validate using zod 
      empolyeeSchema.register.parse(req.body)
      // check the existing email, phonenumber already used
      const empolyeeExiste = await prisma.employee.findFirst({
         where:{
             employee_email:req.body.employee_email
         }
      })
      if (empolyeeExiste){
         return res.status (403).json({
            message: "Email is already existed!",
            success : false
         })
      }
      const employphone_existe  = await prisma.employee_info.findFirst({
         where:{
            employee_phone:req.body.employee_phone
         }
      })
      if (employphone_existe){
         return res.status(403).json({
            message:"Phone number already existed!",
            success: false
         })
      }
      // how to encrypting password 
      req.body.employee_password = await bcrypt.hashSync(req.body.employee_password,10)

      // how to insert into the table 
      const newemployee = await prisma.employee.create({
         data:{
            active_employee:req.body.active_employee,
            employee_email: req.body.employee_email,
            employee:{
               create:{
                  employee_first_name:req.body.employee_first_name,
                  employee_last_name:req.body.employee_last_name,
                  employee_phone:req.body.employee_phone,
               }
            },
            employee_pass:{
               create:{
                  employee_password_hashed:req.body.employee_password,
               }
            },
            employee_role:{
               create:{
                  company_role_id:req.body.company_role_id,
               }
            }
         }
      })
      // success response 
      return res.status (201).json({
         message: "Employee created successfully!!",
         success: true,
         data: newemployee
      })
    } catch (error) {
      console.log(error)
     return res.status (500).json({
        message: error,
        success: false,
     })
    }
   },

   update: async (req, res) => {
      try {
        // Validate using Zod (assuming there is a schema for updating)
        await empolyeeSchema.updated.parse(req.body);
         
        // Check if employee exists with this id / employee_id
        const existingEmployee = await prisma.employee.findFirst({
          where: {
            id: + req.body.employee_id,  
          }
        });
   
        if (!existingEmployee) {
          // If the employee doesn't exist, return an appropriate error response.
          return res.status(404).json({
            error: "Employee not found"
          });
        }
     
     // update employee information 
     const updateEmployee = await prisma.employee.update({
        where:{id: + req.body.employee_id, },
        data:{
           active_employee: req.body.active_employee,
           employee_email: req.body.employee_email,
           employee:{
              update:{
                 employee_first_name:req.body.employee_first_name,
                 employee_last_name: req.body.employee_last_name,
                 employee_phone: req.body.employee_phone,
              },
           },

        },
     });
     
     // success response
     return res.status (201).json({
        message: "Employee updated successfully!!",
        success: true,
        data: updateEmployee,
     });
  
   } catch (error){
     return res.status (400).json({
        message:error.message,
        success: false,
     });
   }
  },

  getAll: async (req, res) => {
   try {
    // fetch all customers 
     const employees = await prisma.employee.findMany({
       include: {
         employee: true,
         employee_role: true,
       },
     });

     return res.status(200).json({
       success: true,
       data: employees,
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
     const employee = await prisma.employee.findFirst({
        where: {id: + req.params.id},
        include: {
           employee: true,
           employee_role: true,
        }
     })
     if (!employee) {
        return res.status(404).json({
           message: "Employee not found",
           success: false,
        });
     } return res.status (200).json({
           success: true,
           data: employee,
        });
     }catch (error){
        return res.status (400).json({
           message:error.message,
           success: false,
        })
     }
   },
   
   delete: async (req, res) => {
     try {  
      const existingEmployee = await prisma.employee.findFirst({
         where: {id:+req.params.id},
       });
  
       if (!existingEmployee) {
         // If the employee doesn't exist, return an appropriate error response.
         return res.status(404).json({
           error: "Employee not found"
         });
       }
       const deletedEmployeepass = await prisma.employee_pass.delete({
         where: {employee_id:+req.params.id},
      });
      const deletedEmployeerole = await prisma.employee_role.delete({
         where: {employee_id:+req.params.id},
      });
      const deletedEmployeeinfo = await prisma.employee_info.delete({
         where: {employee_id:+req.params.id},
      });
     const deletedEmployee = await prisma.employee.delete({
        where: {id:+req.params.id},
     });

     return res.status(200).json({
       success: true,
       data: deletedEmployee,
     });
   }catch (error){
     return res.status (400).json({
        message: error.message,
        success: false,
     });
   }
  },
};

export default employeeController;




//         "employee_email": "test@test.com",
//         "employee_first_name": "Test",
//         "employee_last_name": "Test",
//         "employee_phone": "555-555-5555",
//         "active_employee": 1,
//         "added_date": "2016-11-28T14:10:11.338Z", 
//         "employee_password": "8HYsy&^uud*7hh", 
//       }



  //   {
   //      "employee_id": 1,
   //      "employee_first_name": "Test",
   //      "employee_last_name": "Test",
   //      "employee_phone": "555-555-5555",
   //      "active_employee": 1,
   //    }



//  register: (req, res) => {},
//     update : (req,res) => {},
//     getAll : (req,res) => {},
//     getSingle : (req, res) => {},
//     delete : (req, res) => {},