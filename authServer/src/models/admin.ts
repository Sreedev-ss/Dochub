import mongoose, {model, Schema } from 'mongoose';
import db from '../config/mongodb/mongoose';

interface Admin {
  name: string;
  email: string;
  password:string
}
interface AdminDocument extends Admin, Document {
    _id: any;
}

const adminSchema = new Schema<Admin>({
  name: {
    type: String,
    required: true,
    default:'admin'
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type:String
  }
});

const AdminModel = db.model<AdminDocument>('admin', adminSchema);

export {Admin, AdminDocument, AdminModel}