import mongoose, { Schema, Document } from 'mongoose';
import db from '../config/mongodb';


interface Department {
    specialization : string
}

interface DepartmentDocument extends Department, Document {}

const DepartmentSchema = new Schema<DepartmentDocument>({
    specialization:{
        type:String,
        required:true,
        unique:true
    }
})


const DepartmentModel = db.model<DepartmentDocument>('Department',DepartmentSchema)

export {Department, DepartmentDocument, DepartmentModel}