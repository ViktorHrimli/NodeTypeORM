const nodemailer = require("nodemailer");

const { MAIL_USER, MAIL_PORT, MAIL_HOST, MAIL_PASS } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "viktor_hrimli101@meta.ua",
    pass: MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

export class MailServices {
  async sendActivationMail(email: string, link: string) {
    const emailOptions = {
      from: "viktor_hrimli101@meta.ua",
      subject: "Activated mail!",
      text: "",
      html: `
      <div> 
          <h1>Activated your email ${email}!</h1>
          <p><a href=${link}>Link </a></p>
      </div>
      `,
    };
    await transporter.sendMail({ ...emailOptions, to: email });
  }
}
