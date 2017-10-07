const nodemailer = require('nodemailer');

module.exports = (app) => {
  app.post('/api/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'michael.tolis@gmail.com',
        pass: 'PI427233897n+3p866hzvlm'
      }
    });

    const text = 'testing bitfch from \n' + req.body.name;

    const mailOptions = {
      from: 'michael.tolis@gmail.com',
      to: 'apanpie.antan@gmail.com',
      subject: 'Aloha bitcheeeeeeees!',
      text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.json({
          yo: 'error'
        });
      } else {
        console.log('Message sent: ' + info.response);
        res.json({
          yo: info.response
        });
      }
    });
  });
};