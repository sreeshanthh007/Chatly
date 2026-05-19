import { IEmailService } from "@domain/interfaces/services/email.service.interface";
import { CONFIG } from "@shared/config";
import { getOtpEmailTemplate } from "@shared/constants/emailTemplates";
import nodemailer from "nodemailer"

export class EmailService implements IEmailService {
    
    private transporter;


    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:CONFIG.EMAIL_USER,
                pass:CONFIG.EMAIL_PASS,
            }
        })
    }

    async sendOtpMail(to: string, subject: string, text: string): Promise<void> {
        
        const mailOptions = {
            from : "Chatly",
            to,
            subject,
            html:getOtpEmailTemplate(text)
        }

        await this.transporter.sendMail(mailOptions)
    }
}