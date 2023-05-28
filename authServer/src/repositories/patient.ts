import { PatientModel, Patient, PatientDocument } from '../models/patient';

class PatientRepository {
  async findById(id: string): Promise<PatientDocument | null> {
    return PatientModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<PatientDocument | null> {
    return PatientModel.findOne({ email }).exec();
  }

  async create(patient: Patient): Promise<PatientDocument> {
    return PatientModel.create(patient);
  }
}

export { PatientRepository };
