export interface IAppointment {
    name: string,
    age: string,
    doctorId: string,
    patientId: string,
    email: string,
    gender: string,
    mobile: string,
    symptoms: string,
    date: string,
    time: string,
    fees: number,
    payment: boolean,
    payment_intent: string,
    doctorName: string,
    doctorProfile: string
}

export interface IPrescription{
    createdAt:string,
        doctorId: string,
        patientId: string,
        doctorName: string,
        medicine: string,
        dosage: string,
        notes: string
}