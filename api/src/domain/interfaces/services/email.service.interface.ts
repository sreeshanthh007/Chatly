

export interface IEmailService {
    sendOtpMail(to:string,subject:string,text:string) : Promise<void>
    sendPasswordChangedMail(to:string,subject:string,text:string) : Promise<void>
}