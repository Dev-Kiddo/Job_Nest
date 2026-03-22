import nodemailer from "nodemailer";

export const sendEmail = async function (toUser: string, emailSubject: string, emailContent: string) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.log("ENV variables missing!");
      return;
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const emailInfo = await transport.sendMail({
      from: process.env.EMAIL_FROM_USER,
      to: toUser,
      subject: emailSubject,
      html: emailContent,
    });

    // console.log("EMAIL_INFO", emailInfo);

    return emailInfo.messageId;
  } catch (error) {
    console.log("Email Err:", error);
    return;
  }
};
