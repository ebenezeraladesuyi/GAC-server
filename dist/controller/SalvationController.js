"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSalvationMessage = exports.salvationMessage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SalvationModel_1 = __importDefault(require("../model/SalvationModel"));
const salvationMessage = () => {
};
exports.salvationMessage = salvationMessage;
const sendSalvationMessage = async (req, res) => {
    try {
        // extract date from req.body
        const { name, email, phoneNumber, prayer } = req.body;
        // save message to mongoDB
        const contactSalvation = await SalvationModel_1.default.create({ name, email, phoneNumber, prayer });
        // send email to website owner
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'clientvolatic@gmail.com',
                pass: 'cycnkqypwdzosbce' // Your Gmail password
            }
        });
        const mailOptions = {
            from: `Email: ${email}`,
            to: 'graceaccesschurch@gmail.com',
            subject: 'New Message from Call To Salvation Form',
            // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>New Message from Call To Salvation</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Email:</strong> ${phoneNumber}</p>
                        <p><strong>Message:</strong> ${prayer}</p>
                    </div>
                </body>
                </html>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Failed to send email' });
            }
            else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Message sent successfully' });
            }
        });
    }
    catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.sendSalvationMessage = sendSalvationMessage;
