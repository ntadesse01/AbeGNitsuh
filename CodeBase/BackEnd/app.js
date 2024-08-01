//Imports and Configuration
import express from "express"
import cors from "cors"
import {PORT,HOST} from "./config/secrets.js"

//Express Application Setup
const app = express()
app.use(cors())
app.use (express.json())
app.use (express.urlencoded({
    extended: true 
}))

//Routes

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

import appRoute from "./route/index.js"
app.use("/api",appRoute)

//call back function /Starting the Server
app.listen (PORT,HOST,(e)=>{
   if (e){console.log(`error ${e}`)}
   else{
    console.log(`listening on http://${HOST}:${PORT}`)
   }
     
}
)