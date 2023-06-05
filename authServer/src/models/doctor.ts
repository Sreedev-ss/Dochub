import { Schema, model, Document } from 'mongoose';
import db from '../config/mongodb/mongoose';

interface Doctor {
  name: string;
  email: string;
  password: string;
  blocked:boolean
}

interface DoctorDocument extends Doctor, Document { }

const DoctorSchema = new Schema<DoctorDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  blocked: { type: Boolean, required: true },
});

const DoctorModel = db.model<DoctorDocument>('Doctor', DoctorSchema);

export { Doctor, DoctorDocument, DoctorModel };
