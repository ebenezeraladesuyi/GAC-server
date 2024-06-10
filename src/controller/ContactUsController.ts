import {Request, Response} from "express";
import nodemailer from "nodemailer";
import contactUsModel from "../model/ContactUsModel";



export const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        // extract date from req.body
        const { name, email, message } = req.body;

        // save message to mongoDB
        const contactMessage = await contactUsModel.create({name, email,message});

        // send email to website owner
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com', // Your Gmail email address
                pass: 'your_password' // Your Gmail password
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com', // Your Gmail email address
            to: 'website_owner_email@example.com', // Website owner's email address
            subject: 'New Message from Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Message sent successfully' });
            }
        });

    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Internal server error' });        
    }
}

