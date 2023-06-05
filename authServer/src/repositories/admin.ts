import {AdminDocument,AdminModel} from '../models/admin'

class AdminRepository {
    async findById(id: string): Promise<AdminDocument | null> {
      return AdminModel.findById(id).exec();
    }
  
    async findByEmail(email: string): Promise<AdminDocument | null> {
      return AdminModel.findOne({ email }).exec();
    }
  
  }
  
  export { AdminRepository };