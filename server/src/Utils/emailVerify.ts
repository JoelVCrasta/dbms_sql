import nodemailer from "nodemailer"

// Function to send email to the user for account verification
export const sendEmail = async (email: string) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "loejstarc@gmail.com",
      pass: "scch oxcd okjd jvph",
    },
  })

  // Email contents
  var mailOptions = {
    from: "loejstarc@gmail.com",
    to: email,
    subject: "OpenChat Account Verification",
    text: `Click the link to verify your account:`,
    html: `<a href="http://localhost:3000/verify?email=${email}">Click here to verify</a>`,
  }

  // Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}
