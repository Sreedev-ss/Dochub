import { Appointment, AppointmentDocument, AppointmentModel } from '../models/appointment'

class AppointmentRepository {
    async findById(id: string): Promise<AppointmentDocument | null> {
        return AppointmentModel.findById(id).exec();
    }
    async findByPatientId(patientId: string,skip:any,limit:any): Promise<AppointmentDocument[] | null> {
        return AppointmentModel.find({patientId}).sort({ _id: -1 }).skip(skip).limit(limit).exec();
    }
    
    async findByDoctorId(doctorId: string,skip:any,limit:any): Promise<AppointmentDocument[] | null> {
        return AppointmentModel.find({doctorId}).sort({ _id: -1 }).skip(skip).limit(limit).exec();
    }
    
    async findByDoctorIdAndDate(doctorId: string,date:string): Promise<AppointmentDocument[] | null> {
        return AppointmentModel.find({doctorId,date}).exec();
    }

    async findByEmail(email: string): Promise<AppointmentDocument | null> {
        return AppointmentModel.findOne({ email }).exec();
    }

    async create(appointment: Appointment): Promise<AppointmentDocument> {
        return AppointmentModel.create(appointment);
    }

    async updatePaymentStatus(payment_intent: string, appointmentId: any): Promise<any | null> {
        return AppointmentModel.updateOne({ _id: appointmentId }, {
            $set: {
                payment_intent: payment_intent,
                payment: true
            }
        })
    }
}

export { AppointmentRepository }