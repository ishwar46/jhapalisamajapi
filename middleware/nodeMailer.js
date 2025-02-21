const nodemailer = require("nodemailer");

const transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ganjahanja1@gmail.com",
    pass: "sqjwnsbjwhinuogq",
  },
};

exports.sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo); //transporter gives from information
    let info = await transporter.sendMail(mailInfo);

  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
