import nodemailer from "nodemailer"
export const sendEmail=(receipt,subject,body)=>{
    const transporter=nodemailer.createTransport({
       service:process.env.EMAIL_SERVICE,
       auth:{
           user:process.env.EMAIL_USER,
           pass:process.env.EMAIL_PASSWORD
       },
       tls: {
           rejectUnauthorized: false, 
       
       }
    })
    const mailOptions = {
       from: '"SeekConnect" <gloria7wineza@gmail.com>',
       to: receipt,
       subject: subject,
       text: body
   };
   transporter.sendMail(mailOptions,(error,info)=>{
       if (error) {
           console.error('Error sending email:', error);
       } else {
           console.log('Email sent:', info.response);
       }
   })
   }