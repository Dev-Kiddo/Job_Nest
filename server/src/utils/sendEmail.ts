import nodemailer from "nodemailer";

export const sendEmail = async function (toUser: string, emailSubject: string, emailContent: string) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.log("ENV variables missing!");
      return;
    }

    // const transport = nodemailer.createTransport({
    //   service: "gmail",

    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASSWORD,
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    //   debug: true,
    //   logger: true,
    // });

    const transport = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
      family: 4,
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    console.log(transport);

    const emailInfo = await transport.sendMail(
      {
        from: process.env.EMAIL_FROM_USER,
        to: toUser,
        subject: emailSubject,
        html: emailContent,
      },
      (error, info) => {
        if (error) {
          console.log("Gmail Error:", error);
          console.log("Error Code:", error.code);
          console.log("Error Command:", error.command);
        } else {
          console.log("Email sent:", info.response);
        }
      },
    );

    console.log("EMAIL_INFO", emailInfo);

    return emailInfo.messageId;
  } catch (error) {
    console.log("Email Err:", error);
    return;
  }
};
