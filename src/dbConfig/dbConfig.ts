import mongoose from "mongoose";

export async function connect(){
    try {
        //hame pata he ki ane wali value string hi hogi islie ! lagaya he 
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDb Connected")
        })

        //if error
        connection.on("error", (err) => {
            console.log("MongoDB connection error, plz make sure id up and running: " + err)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong in connecting to DB")
        console.log(error)
    }
}