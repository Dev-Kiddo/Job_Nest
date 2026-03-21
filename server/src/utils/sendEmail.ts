import nodemailer from "nodemailer";

export const sendEmail = async function (toUser: string, emailSubject: string, emailContent: string) {
  try {
    if (!process.env.MAIL_TRAP_HOST || !process.env.MAIL_TRAP_PORT || !process.env.MAIL_TRAP_USERNAME || !process.env.MAIL_TRAP_PASSWORD || !process.env.EMAIL_FROM_USER) {
      console.log("ENV variables missing!");
      return;
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      auth: {
        user: process.env.MAIL_TRAP_USERNAME,
        pass: process.env.MAIL_TRAP_PASSWORD,
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
