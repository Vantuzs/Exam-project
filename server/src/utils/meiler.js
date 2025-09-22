const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '1586fe139b7b28',
        pass: '74feeac6f1859b'
    }
});

async function sendModeratorAnswer(to,answer,offerId) {
    const answerStatus = answer === 'reject'? 'rejected': 'approved'

    await transporter.sendMail({
        from: `"Moderator" <${'moderator@example.com'}>`,
        to,
        subject: 'Decision on your offer',
        text: `Your offer №${offerId} was ${answerStatus}`,
        html: `<p>Your offer<b>№${offerId}</b> was <b>${answerStatus}</b>.</p>`,
    })
}

module.exports = { sendModeratorAnswer };