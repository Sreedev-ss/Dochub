import mongoose, { Schema, Document } from 'mongoose';
import db from '../config/mongodb';
import { ObjectId } from 'mongodb';

interface Doctor {
    email: string,
    DoctorId: ObjectId,
    specialization: string,
    fees: number,
    mobile: number,
    address: string,
    photoURL: string,
    worktime: string,
    name: string;
    DOB: string;
    gender: string;
    about: string;

}

interface DoctorDocument extends Doctor, Document {}

const DoctorSchema = new Schema<DoctorDocument>({
    email: {
        type: String,
        required: true,
    },
    DoctorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String,
    },
    name: { 
        type: String,
        required: true 
    },
    gender: { 
        type: String, 
        required: true 
    },
    about: { 
        type: String, 
        requied: true 
    },
    DOB:{
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
   worktime: {
        type:String,
        required: true,
        default:'normal'
   },
    fees: {
        type: Number,
        required: true,
    }
});

const DoctorModel = db.model<DoctorDocument>('Doctor', DoctorSchema);

export { Doctor, DoctorDocument, DoctorModel };
