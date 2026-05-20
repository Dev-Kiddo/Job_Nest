import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

export const sendEmail = async function (toUser: string, emailSubject: string, emailContent: string) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.log("ENV variables missing!");
      return;
    }

    if (!process.env.SENDGRID_API_KEY) {
      console.log("SENDGRID_API_KEY missing!");
      return;
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: toUser,
      from: process.env.GMAIL_USER!, // Your verified Gmail
      subject: emailSubject,
      html: emailContent,
    };

    console.log("Sending email to:", toUser);

    const response = await sgMail.send(msg);

    console.log("Email sent successfully");
    return response[0].headers["x-message-id"];

    // const transport = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASSWORD,
    //   },
    // });

    // console.log(process.env.GMAIL_USER, process.env.GMAIL_PASSWORD, toUser, emailSubject, emailContent);

    // const transport = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASSWORD,
    //   },
    //   family: 4,
    //   connectionTimeout: 120000,
    //   greetingTimeout: 60000,
    // });

    // // console.log(transport);

    // const emailInfo = await transport.sendMail({
    //   from: process.env.GMAIL_USER,
    //   to: toUser,
    //   subject: emailSubject,
    //   html: emailContent,
    // });

    // console.log("Email Sent Successfully", emailInfo.messageId);

    // return emailInfo.messageId;
  } catch (error) {
    console.log("SendGrid Error:", error?.response?.body || error);
    return null;
  }
};
