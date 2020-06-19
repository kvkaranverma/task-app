const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'karanv0143@gmail.com',
    from: 'karanv598@gmail.com',
    subject: 'this is my first creation!',
    text: 'I hope this one actually gets to you.'
})