import { DoctorModel, Doctor, DoctorDocument } from '../models/doctor';

class DoctorRepository {
  async findById(id: string): Promise<DoctorDocument | null> {
    return DoctorModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<DoctorDocument | null> {
    return DoctorModel.findOne({ email }).exec();
  }

  async create(doctor: Doctor): Promise<DoctorDocument> {
    return DoctorModel.create(doctor);
  }
}

export { DoctorRepository };
