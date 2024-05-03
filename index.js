import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
dotenv.config()

const app = express()
const port = process.env.PORT

import userRoute from "./routes/user.router.js"
app.use(express.json())

app.use("/users", userRoute)





app.listen(port,
    err=>{
        err ? console.log(err) :
        console.log("Server running on port", port,"....")
    }
)