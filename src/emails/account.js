const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    console.log(email)
    sgMail.send({
        to: email,
        from: 'karanv598@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    console.log(email)
    sgMail.send({
        to: email,
        from: 'karanv598@gmail.com',
        subject: 'Account Cancelation',
        text: `${name}, sorry to see you go.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}