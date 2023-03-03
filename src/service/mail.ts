const nodemailer = require("nodemailer");

const { MAIL_USER, MAIL_PORT, MAIL_HOST, MAIL_PASS } = process.env;

export class MailServices {
  transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }
  async sendActivationMail(email: string, link: string) {
    const emailOptions = {
      from: MAIL_USER,
      to: email,
      subject: "Activated mail!",
      html: `
      <div> 
          <h1>Activated your email ${email}!</h1>
          <p>Link <a href=${link} /> </p>
      </div>
      `,
    };
    await this.transporter.sendMail(emailOptions);
  }
}
