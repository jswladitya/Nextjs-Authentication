/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    const hasedToken = await bcryptjs.hash(userId.toString(), 10)
    
    if(emailType === 'VERIFY'){
      await User.findByIdAndUpdate(userId, 
        {verifytoken: hasedToken, verifyTokenExpiry: Date.now() + 3600000}
      )
    }
    
    else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userId, 
        {forgotPasswordToken: hasedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}
      )
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4a50d27f5af912",
          pass: "3c86f7221799a9"
        }
      });

    const mailOptions = {
        from: 'jaiswaladitya116@gmail.com', // sender address
        to: email,
        subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
        html: `<p>click <a href ='${process.env.DOMAIN}/verifyemail?token=${hasedToken}'>here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "reset your password"} or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
        </p>`, // html body
      }

      const mailResponse = await transport.sendMail(mailOptions)

      return mailResponse
  } catch (error:any) {
    throw new Error(error.message)
  }
};
