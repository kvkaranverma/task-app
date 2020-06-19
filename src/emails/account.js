const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

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