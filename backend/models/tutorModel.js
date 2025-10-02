import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    image:{type:String, required:true},
    qualification:{type:String, required:true},
    subject:{type:String, required:true},
    experience:{type:String, required:true},
    about:{type:String, required:true},
    available:{type:Boolean, default:true},
    fees:{type:Number, required:true},
    location:{type:Object, required:true},
    date:{type:Number, required:true},
    slots_booked:{type:Object, default:{}},
}, {minimize: false})

const tutorModel = mongoose.models.tutor || mongoose.model('tutor', tutorSchema)

export default tutorModel