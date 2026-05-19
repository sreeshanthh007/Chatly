import { IOtpService } from "@domain/interfaces/services/otp.service.interface";


export class OtpService implements IOtpService {

    generateOtp() : string {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
}