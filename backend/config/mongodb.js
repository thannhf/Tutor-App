import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("contected DB")
    } catch (error) {
        console.error("contected DB failed: ", error.message)
    }
}

export default connectDB