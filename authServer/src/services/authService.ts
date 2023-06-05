import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv'
import { EncryptionService } from './encryptionService';
import verifyFirebaseToken from '../config/firebase/firebase';
import { resMessages } from '../constants/resMessges';
import { httpStatus } from '../constants/httpStatus';
import { DoctorRepository } from '../repositories/doctor';
import { PatientRepository } from '../repositories/patient';
import { AdminRepository } from '../repositories/admin';

const encryptionService = new EncryptionService()
const responseMsg = resMessages()
const httpMsg = httpStatus()
const doctorRepo = new DoctorRepository()
const patientRepo = new PatientRepository()
const adminRepo = new AdminRepository()

dotEnv.config()

enum Role {
    Doctor = 'doctor',
    Patient = 'patient',
    Admin = 'admin'
}


class AuthService {
    async register(name: string, email: string, password: string, idToken: string, role: string) {
        console.log(name, email, password, idToken, role)
        try {
            if (role == Role.Patient) {
                if (idToken) {
                    const user = await verifyFirebaseToken(idToken);
                    const userData: any = {
                        name: user.displayName,
                        email: user.email,
                        profileURL: user.photoURL,
                        blocked: false,
                    };

                    const patientCheck = await patientRepo.findByEmail(userData?.email)
                    if (!patientCheck) {
                        const patient = await patientRepo.create(userData);
                        return patient;
                    } else {
                        throw { message: responseMsg.USER_EXIST }
                    }
                } else {
                    const patientCheck = await patientRepo.findByEmail(email)
                    const hashedPassword = await encryptionService.hashPassword(password)
                    const userData: any = {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        profileURL: 'false',
                        blocked: false,
                    }
                    if (!patientCheck) {
                        const patient = await patientRepo.create(userData);
                        return patient;
                    } else {
                        throw { message: responseMsg.USER_EXIST }
                    }
                }
            } else if (role == Role.Doctor) {
                const doctorCheck = await doctorRepo.findByEmail(email)
                const hashedPassword = await encryptionService.hashPassword(password)

                const userData: any = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    blocked: false,
                }
                if (!doctorCheck) {
                    const doctor = await doctorRepo.create(userData);
                    return doctor;
                } else {
                    throw { message: responseMsg.USER_EXIST }
                }
            } else {
                throw new Error('Invalid role')
            }

        } catch (error) {
            throw { message: error.message ? error.message : httpMsg[500] }
        }

    }

    async login(email: string, password: string, idToken: string) {
        const doctor = await doctorRepo.findByEmail(email)
        const admin = await adminRepo.findByEmail(email)
        console.log(admin);
        
        try {
            if (doctor) {
                if (await encryptionService.comparePasswords(password, doctor.password)) {
                    const token = jwt.sign({ userId: doctor._id, email: doctor.email, role: Role.Doctor }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1h',
                    });
                    return { token, userId: doctor._id, email, name: doctor.name, role: Role.Doctor };
                } else {
                    throw new Error('Invalid Password')
                }
            } else if (admin) {
                if (await encryptionService.comparePasswords(password, admin.password)) {
                    const token = jwt.sign({ userId: admin._id, email: admin.email, role: Role.Admin }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1h',
                    });
                    return { token, userId: admin._id, email, name: admin.name, role: Role.Admin };
                } else {
                    throw new Error('Invalid Password')
                }
            } else {
                if (idToken) {
                    const patientData = await verifyFirebaseToken(idToken);
                    const userData = {
                        name: patientData.displayName,
                        email: patientData.email,
                        profileURL: patientData.photoURL ? patientData.photoURL : false,
                        blocked: false
                    };
                    const patient = await patientRepo.findByEmail(userData.email);
                    if (patient) {
                        const token = jwt.sign({ userId: patient.id, role: Role.Patient, email: userData.email }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '1h',
                        });
                        return { token, userId: patient.id, profileURL: userData.profileURL, email, name: patient.name, role: Role.Patient };
                    } else {
                        throw new Error('Invalid email or password')
                    }
                } else {
                    const patient = await patientRepo.findByEmail(email);
                    if (patient && await encryptionService.comparePasswords(password, patient.password)) {
                        const token = jwt.sign({ userId: patient.id, role: Role.Patient, email: email }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '1h',
                        });
                        return { token, userId: patient.id, email, name: patient.name, role: Role.Patient };
                    } else {
                        throw new Error('Invalid email or password')
                    }
                }
            }
        } catch (error) {
            throw error
        }
    }
}

export { AuthService };
