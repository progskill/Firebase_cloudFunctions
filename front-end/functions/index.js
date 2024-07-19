const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

exports.sendEmailToNewAdmin = functions.firestore
  .document("UserTestProgram/{docId}")
  .onCreate(async (snapshot, context) => {
    const userData = snapshot.data();
    const userEmail = userData.email;

    const mailOptions = {
      from: "progskill1@gmail.com",
      to: userEmail,
      subject: "Welcome to the Progskill Coding Program 🌟",
      text: `Hello There,\n\nWelcome to the Progskill Tech community! We're excited to have you onboard.\n\nBest regards,\nProgskill Team`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Joined Email notification sent successfully!");
    } catch (error) {
      console.error("Error sending email In tech Email:", error);
    }
  });
