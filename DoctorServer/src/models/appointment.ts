import mongoose, { Schema, Document } from 'mongoose';
import db from '../config/mongodb';

interface Appointment {
    name:string,
    age:string,
    doctorId:string,
    patientId:string,
    email:string,
    gender:string,
    mobile:string,
    symptoms:string,
    date:string,
    time:string,
    fees:number,
    payment:boolean,
    payment_intent:string,
    doctorName:string,
    doctorProfile:string
}

interface AppointmentDocument extends Appointment, Document {}

const AppointmentSchema = new Schema<AppointmentDocument>({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    patientId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    symptoms:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    fees: {
        type:Number,
        required:true
    },
    payment:{
        type:Boolean,
        default:false
    },
    payment_intent:{
        type:String,
        default:''
    },
    doctorName:{
        type:String,
        required:true
    },
    doctorProfile:{
        type:String,
    }

})


const AppointmentModel = db.model<AppointmentDocument>('Appointment',AppointmentSchema)

export {Appointment, AppointmentDocument, AppointmentModel}