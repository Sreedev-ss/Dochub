import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv'
import { EncryptionService } from './encryptionService';
import verifyFirebaseToken from '../config/firebase/firebase';
import { resMessages } from '../constants/resMessges';
import { httpStatus } from '../constants/httpStatus';
import { DoctorRepository } from '../repositories/doctor';
import { PatientRepository } from '../repositories/patient';

const encryptionService = new EncryptionService()
const responseMsg = resMessages()
const httpMsg = httpStatus()
const doctorRepo = new DoctorRepository()
const patientRepo = new PatientRepository()

dotEnv.config()

class AuthService {
    async register(name: string, email: string, password: string, idToken: string) {
        try {
            if (idToken) {
                const user = await verifyFirebaseToken(idToken);
                const userData: any = {
                    name: user.displayName,
                    email: user.email,
                    profileURL: user.photoURL ,
                    blocked: false,
                };

                const patientCheck = await patientRepo.findByEmail(userData?.email)
                if (!patientCheck) {
                    const patient = patientRepo.create(userData);
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
                    profileURL:'false',
                    blocked: false,
                }
                if (!patientCheck) {
                    const patient = patientRepo.create(userData);
                    return patient;
                } else {
                    throw { message: responseMsg.USER_EXIST }
                }
            }

        } catch (error) {
            throw { message: error.message ? error.message : httpMsg[500] }
        }

    }

    async login(email: string, password: string, idToken: string) {
        const doctor = await doctorRepo.findByEmail(email)
        try {
            if (doctor) {
                if (await encryptionService.comparePasswords(password, doctor.password)) {
                    const token = jwt.sign({ userId: doctor._id, email:doctor.email,role:'doctor' }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1h',
                    });
                    return { token, userId: doctor._id, email, name: doctor.name, role: 'doctor' };
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
                        const token = jwt.sign({ userId: patient.id,role:'patient', email:userData.email }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '1h',
                        });
                        return { token, userId: patient.id, profileURL: userData.profileURL, email, name: patient.name, role: 'patient' };
                    } else {
                        throw new Error('Invalid email or password')
                    }
                } else {
                    const patient = await patientRepo.findByEmail(email);
                    if (await encryptionService.comparePasswords(password, patient.password)) {
                        const token = jwt.sign({ userId: patient.id, role:'patient', email:email  }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '1h',
                        });
                        return { token, userId: patient.id, email, name: patient.name, role: 'patient' };
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
