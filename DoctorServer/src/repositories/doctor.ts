import { DoctorModel, Doctor, DoctorDocument } from '../models/doctor'

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

  async update(doctorId: string, field: keyof Doctor, value: any): Promise<any | null> {
    const updateField: Partial<Doctor> = {
      [field]: value,
    };
    return DoctorModel.updateOne({ _id: doctorId }, { $set: updateField });
  }

  async findDocRequest(): Promise<DoctorDocument[] | null> {
    return DoctorModel.find({approved:false})
  }
}

export { DoctorRepository };
