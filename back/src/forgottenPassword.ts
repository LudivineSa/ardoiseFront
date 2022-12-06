"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function main(token: string, email: string) {

  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  // send mail with defined transport object
  return new Promise((resolve, reject) => {
    transporter.sendMail({
    from: '"Tuesday" <tuesdayWildCodeSchool@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Récupération de mot de passe", // Subject line
    text: "Mot de passe oublié", // plain text body
    html: "<b>Mot de passe oublié?</b> " + token , // html body
  }, (err : any, data : any) => {
    if (err) {
      reject(false);
    } else {
      resolve(true);
    }
  });
  })
}
