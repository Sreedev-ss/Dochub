import { Request, Response } from 'express';
import { DoctorApi } from '../service/doctorApi';
import { DoctorRepository } from '../repositories/doctor';
import { DoctorService } from '../service/doctorService';
import { DoctorModel } from '../models/doctor';
import { DepartmentModel } from '../models/department';
import { AppointmentRepository } from '../repositories/appointment';
import { AppointmentModel } from '../models/appointment';
import { PrescriptionModel } from '../models/prescription';

const doctorAPI = new DoctorApi()
const docService = new DoctorService()
const doctorRepo = new DoctorRepository()
const appointmentRepo = new AppointmentRepository()

export const registerDoctor = async (req: Request, res: Response) => {
    try {

        const { name, DOB, sex, about, approved, email, password, role, mobile, specialization, address, photoURL, fees, worktime } = req.body.doctor
        const doctor = await doctorRepo.findByEmail(email)
        if (!doctor) {
            const response = await doctorAPI.registerDoctor(email, password, name, role)
            if (response) {
                const Id = response.data._id
                const addDoctor = await docService.addDoctor(Id, email, mobile, specialization, address, photoURL, name, DOB, sex, about, fees, worktime, approved)
                res.json(addDoctor)
            } else {
                throw 'Error adding doctor'
            }
        } else {
            throw 'Doctor already exist. Please Login'
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getAllDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await DoctorModel.find({ approved: true })
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDoctor = async (req: Request, res: Response) => {
    try {
        const email = req.params.email
        const doctor = await doctorRepo.findByEmail(email)
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getDoctorById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const doctor = await doctorRepo.findById(id)
        console.log(doctor);

        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDepartment = async (req: Request, res: Response) => {
    try {
        const department = await DepartmentModel.find({})
        res.json(department)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addDepartment = async (req: Request, res: Response) => {
    try {
        const { department } = req.body
        const response = await DepartmentModel.create({ specialization: department })
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getDoctorRequest = async (req: Request, res: Response) => {
    try {
        const response = await doctorRepo.findDocRequest()
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: 'Cannot find requested doctor' })
    }
}

export const approveDoctorRealtimeRequest = async (id: string, field: any, value: any) => {
    try {
        const response = await doctorRepo.update(id, field, value)
        return response
    } catch (error) {
        return error.message
    }
}

export const searchDoctor = async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const results = await DoctorModel.find({
            name: { $regex: new RegExp(`^${query as string}`, 'i') }, // Case-insensitive search
            approved:true
        });
        res.json(results);
    } catch (error) {
        console.log('Error occurred during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const addPrescription  = async (req: Request, res: Response) => {
    try {
        const {data} = req.body
        console.log(data)
        const response = await PrescriptionModel.create(data)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getPatientCount = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params
        const patients = await AppointmentModel.aggregate([
            {
                $match: {
                    doctorId: doctorId
                }
            },
            {
                $group: {
                    _id: '$doctorId',
                    male: {
                        $sum: {
                            $cond: [{ $eq: ['$gender', 'Male'] }, 1, 0],
                        },
                    },
                    female: {
                        $sum: {
                            $cond: [{ $eq: ['$gender', 'Female'] }, 1, 0],
                        },
                    },
                    total: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    doctorId: '$_id',
                    male: 1,
                    female: 1,
                    total: 1,
                },
            },
        ]);
        res.json(patients)

    } catch (error) {
        console.log('Error occurred during fetching patients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getSymptomType = async(req:Request, res:Response) => {
    try {
        const {doctorId} = req.params
        const symptomType = await AppointmentModel.aggregate([
            {
                $match: {
                    doctorId: doctorId
                }
            },
            {
                $group: {
                  _id: '$symptoms', 
                  count: { $sum: 1 }, 
                },
              },
        ])
        res.json(symptomType)
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
}

export const getTotalRevenue = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params
        const revenue = await AppointmentModel.aggregate([
            {
                $match: {
                    doctorId: doctorId
                }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: { $toInt: '$fees' } },
                },
            },
        ]);

        res.json(revenue)
    } catch (error) {
        console.log('Error occurred during fetching total revenue by doctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMontlyRevenue = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params

        const result = await AppointmentModel.aggregate([
            {
                $match: {
                    doctorId: doctorId
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: { $toDate: '$date' } },
                        year: { $year: { $toDate: '$date' } },
                    },
                    revenue: { $sum: { $toDouble: '$fees' } },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                },
            },
        ]);
        const monthlyRevenueArray = Array(12).fill(0);

        result.forEach((item) => {
            const monthIndex = item._id.month - 1;
            monthlyRevenueArray[monthIndex] = item.revenue;
        });

        res.json({result,monthlyRevenueArray})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

export const getYearlyRevenue = async(req: Request, res: Response) => {
    try {
        const { doctorId } = req.params
        const result = await AppointmentModel.aggregate([
            {
                $match: {
                    doctorId: doctorId
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: { $toDate: '$date' } },
                    },
                    revenue: { $sum: { $toDouble: '$fees' } },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                },
            },
        ]);
        const yearlyRevenueArray = Array(4).fill(0);

        result.forEach((item,i) => {
            yearlyRevenueArray[4-i] = item.revenue;
        });

        res.json({result,yearlyRevenueArray})
     
     
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}





