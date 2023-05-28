import mongoose, {model, Schema } from 'mongoose';
import db from '../config/mongodb/mongoose';

interface Patient {
  name: string;
  email: string;
  profileURL: string;
  blocked: boolean;
  password:string
}
interface PatientDocument extends Patient, Document {
    id: any;
}

const patientSchema = new Schema<Patient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profileURL: {
    type: String,
  },
  blocked: {
    type: Boolean,
    required: true,
  },
  password: {
    type:String
  }
});

const PatientModel = db.model<PatientDocument>('user', patientSchema);

export {Patient, PatientDocument, PatientModel}