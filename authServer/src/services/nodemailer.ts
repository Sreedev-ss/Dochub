import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendMail = async (email: string,code:any) => {
    const testAccount = await nodemailer.createTestAccount();
    let Transport: any = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: `"Dochub email verification" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Email confirmation',
        html: `Your verification code is ${code}`
    }

    Transport.sendMail(mailOptions, (err: any, response: any) => {
        if (err) {
            throw 'Failed to send verification email'
        } else {
            return { message: 'Verification email sent' }
        }
    })
}