import mongoose, { Schema, Document } from 'mongoose';
import db from '../config/mongodb';

interface Prescription {
    doctorId: string,
    patientId: string,
    doctorName: string,
    medicine: string,
    dosage: string,
    notes: string
}

interface PrescriptionDocument extends Prescription, Document { }

const PrescriptionSchema = new Schema<PrescriptionDocument>({
    doctorName: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    medicine: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

const PrescriptionModel = db.model<PrescriptionDocument>('Prescription', PrescriptionSchema)

export {Prescription,PrescriptionDocument,PrescriptionModel}