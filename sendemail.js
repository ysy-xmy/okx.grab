let nodemailer = require('nodemailer');
const sendemail = (name, to, subject, html) => {
    let mailTransport = nodemailer.createTransport({
        // host: 'smtp.qq.email',
        service: 'qq',
        secure: true,	//安全方式发送,建议都加上
        auth: {
            user: '979347733@qq.com',
            pass: 'nrhjkuuoekrsbchi'
        }
    })

    let options = {
        from: `${name} <979347733@qq.com>`,
        to: to,
        bcc: '密送',
        subject: subject,
        text: '',
        html: html
    };
    mailTransport.sendMail(options, function (err, msg) {
        if (err) {
            console.log(err);

        } else {
            console.log('发送成功')
        }
    })

}
// sendemail('小木鱼', '2398581361@qq.com', 'pepe', 'pepe币跌到82了<br><h1>这时候可以买入</h1>')
module.exports = sendemail
