import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import app from "./src/app.js"

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
        console.log(`Serveris running on port ${PORT}`)
    })

}).catch((error)=>{
    console.log(error)
})

