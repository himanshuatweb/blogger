import nodemailer from 'nodemailer';
import asyncHandler from './asyncHandler';
import ApiError from './ApiError';

type EmailOptions = {
    email: string,
    subject: string,
    message: string
}

const sendEmail = async (options: EmailOptions) => {
    const transporter = nodemailer.createTransport({
        service: `${process.env.SMTP_HOST}`,
        auth: {
            user: `${process.env.SMTP_EMAIL}`, // Your Gmail email address
            pass: `${process.env.SMTP_PASSWORD}`, // Your Gmail password or app-specific password
        },
    });

    // send mail with defined transport object
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    let info;
    try {
        info = await transporter.sendMail(message);
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong with - email server",
            [error]
        )
    }
    return info;
};

export default sendEmail;