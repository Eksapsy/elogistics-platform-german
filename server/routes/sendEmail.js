const nodemailer = require('nodemailer');
const axios = require('axios');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const keys = require('../config/keys');

module.exports = (app) => {
  app.post('/api/send-email', async (req, res) => {
    console.log('Preparing to send email ...');
    var transporter = nodemailer.createTransport({
      //service: 'Gmail', // use well known service.
      // If you are using @gmail.com address, then you don't
      // even have to define the service name
      host: 'mail.gpsupplies.gr',
      port: 587,
      auth: {
        user: 'auto@gpsupplies.gr',
        pass: '-[HL1LoD3TFm'
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: true,
      dkim: {
        domainName: 'gpsupplies.gr',
        keySelector: '2017',
        privateKey: `-----BEGIN RSA PRIVATE KEY-----
        MIICXQIBAAKBgQC1VHW1Z1ITEz6Pzwq1zINVxNcGwzBA47JndxRYGAbcDt1J/R8r
        QDLCLZDrosf9fxIVVx+XLB65cbX+VFbG0n1SY6P9ELY5S5Hjn2/a8JyiboVmf058
        o6/4uOb2ZVFTmrMPke52SYAqzRT9bHV+T2xuhYaLM67xLowsHaIKWoKyywIDAQAB
        AoGAHbUdp7+qqadge40PEyPTbIzYMapu0GK9isfulFQzY4An7wRCRAK7jiaK9J/x
        pe1YmBhy+4Bl9DnV+Dn3EZHQqBT8kKfqigG6U1H2Oqe6Y6BVYOtNAWHMJAodyn/l
        HROz8GG4cVoh2IlAcXdBOJdeOnefLME7fmzUumzx37L/C6ECQQDrfnq+BjrBrf0m
        XmZq/MYiaVyOiozXrHxoFTyGEY7c2EJ7DwLwUXSk8ovFqB+vbNxWdIRFpmJpXFqX
        /cvwfWsbAkEAxR6UUBV+r+92gBa1r3GSv7kb7PPL90abYHC4Cy0+S+jdyZQnQJiI
        o3lJPsia0GEv9IVksZwg/YYNO2+JMC8iEQJBAND35B05U+xH42qnvARWF8+zZRGL
        up0rjx2hMprZe8dXE+81C+uKrJIuNH+Jx8wYMpF5RWK02YEbFbzn1o+qC18CQGnG
        GfHLRvrjdWQQS5gESqnEi96fiAB9i9y5P5kHwxj6sSB89n8sGo4WBB7DiIduz0vX
        1IuV6wH/z9Pn6ubHM/ECQQCnGMn5AApPw/QwwqDpocg2cIA2KBDOAKqP9yimkFZN
        Mz6H0rauN1Q2dHxaPLxvD/LHIF8YNG3goep+unihr1oR
        -----END RSA PRIVATE KEY-----`
      }
    });

    /* HTML MESSAGE */
    const {sender, receiver, courier, products, cost, notes} = req.body;
    const scripts = '<style type="text/css">@media screen {@font-face {font-family: \'Lato\';font-style: normal;font-weight: 400;src: local(\'Lato Regular\'), local(\'Lato-Regular\'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format(\'woff\');}body {font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;}</style>';

    const bodyDiv = '<div style=\'background-color: rgba(149,165,166 ,0.7);\'>';
    const messageDiv = '<div style=\'background-color: rgba(250,250,250 ,1); width: 64%; border: 0px solid; border-radius: 8px; margin: 0 auto;\'>';
    const divBordered = '<div style=\'border: 2px solid rgba(222,222,222 ,1); background-color: rgba(236,240,241 ,1);border-radius: 5px; margin-left: 16px; margin-right: 16px; padding: 8px;\'>';
    const endDiv = '</div>';
    const hr = '<br/>';

    const logo = '<center><a href="#"><img src=\'http://gpsupplies.gr/wp-content/uploads/2017/05/NEW-LOGO2b.png\' style=\'height: 128px; width: 128px;\'/></href></center>';
    const header = '<center><h2 style=\'font-family: \'Lobster\', cursive;\'>eLogistics Services</h2></center>';
    const senderHeader = `<center>${sender ? `<h2>Αποστάλθηκε από ${sender}</h2>` : '<h1>No User Recorded</h1><p>If you think it\'s a problem report this. Recording sender is necessary in case someone messes up with an order.</p>'}</center>`;
    const receiverHeader = `<h2>ΠΑΡΑΛΗΠΤΗΣ</h2><table style=\'padding-left: 32px\'><tr><th>ΟΝΟΜΑ</th><th>Α.Φ.Μ.</th><th>Δ.Ο.Υ.</th><th>ΤΟΠΟΘΕΣΙΑ</th><th>ΔΙΕΥΘΥΝΣΗ</th><th>Τ.Κ.</th><th>ΤΗΛ. #1</th></tr><tr><td>${receiver.name}</td><td>${receiver.vat_number}</td><td>${receiver.doy_number}</td><td>${receiver.location}</td><td>${receiver.address}</td><td>${receiver.zip}</td><td>${receiver.phone_1}</td></tr></table>`;

    const courierHeader = `<h2>COURIER</h2><table style=\'padding-left: 32px\'><tr><th>ΟΝΟΜΑ</th><th>ΤΟΠΟΘΕΣΙΑ</th><th>ΤΗΛ.</th></tr><tr><td>${courier.name.toUpperCase()}</td><td>${courier.location}</td><td>${courier.phone}</td></tr></table>`;

    const productHeader = '<h2>ΠΡΟΙΟΝΤΑ</h2>';

    const productsTable_START = '<table  style=\'padding-left: 32px; width: 60%;\'>';
    const productsTable_HEADERS = '<tr><th align=\'left\'>ΚΩΔΙΚΟΣ</th><th align=\'left\'>ΟΝΟΜΑ</th><th align=\'right\'>ΠΟΣΟΤΗΤΑ</th></tr>';
    let productsTable_PRODUCTS = '';

    try {
      products.forEach((product) => {
        productsTable_PRODUCTS += `<tr><td align=left'>${product.id || 'NULL' }</td><td align=\'left\'>${product.name || 'NULL'}</td><td align=\'right\'>${product.amount || 'NaN'}</td></tr>`;
      });
    } catch (e) {
      productsTable_PRODUCTS = '<tr><td align=\'left\'>NULL</td><td align=\'left\'>NULL</td><td align=\'right\'>NaN</td></tr>';
    }

    const productsTable_END = '</table>';

    const costHeader = `<h3>ΚΟΣΤΟΣ:</h3><strong style=\'padding-left: 32px\'>${cost ? String(cost + ' €') : '0 €'}</strong>`;

    const notesHeader = `<h3>ΣΗΜΕΙΩΣΕΙΣ:</h3><div style=\'padding-left: 32px\'>${notes ? notes : ''}</div>`;

    const footer = '<div style=\'margin-left: 16px;\'><br/><hr><br/><strong>ΗΛΕΚΤΡΟΝΙΚΟ ΕΝΤΥΠΟ ΠΑΡΑΓΓΕΛΙΑΣ</strong></div>';
    const fullHtml = scripts + bodyDiv + logo + header + messageDiv + hr + senderHeader + hr + divBordered + receiverHeader + endDiv + hr + divBordered + courierHeader + endDiv + hr + divBordered + productHeader + productsTable_START + productsTable_HEADERS + productsTable_PRODUCTS + productsTable_END + endDiv + hr + divBordered + costHeader + endDiv + hr + divBordered + notesHeader + endDiv + footer + hr + endDiv + hr + endDiv;

    /* Attachment Buffer  */
    let data = [];

    const receiverData = [
      ['Παραλήπτης', 'Α.Φ.Μ.', 'Δ.Ο.Υ.', 'Τηλ. #1', 'Τηλ. #2', 'Τ.Κ.', 'Περιοχή', 'Διεύθυνση', 'Ονομα Courier', 'Περιοχή Courier', 'Τηλ. Courier'],
      [receiver.name, receiver.vat_number, receiver.doy_number, receiver.phone_1, receiver.phone_2, receiver.zip, receiver.location, receiver.address, courier.name, courier.location, courier.phone]
    ];

    data = data.concat(receiverData);
    console.log('data with receiver:', data);
    let productsData = [
      ['ΚΩΔΙΚΟΣ ΠΡΟΙΟΝΤΟΣ', 'ΟΝΟΜΑ ΠΡΟΙΟΝΤΟΣ', 'ΠΟΣΟΤΗΤΑ ΠΡΟΙΟΝΤΟΣ'],
    ];

    productsData = await productsData.concat(products.map((product) => {
      return [product.id, product.name, product.amount];
    }));

    data = productsData.map((productsRow, index) => {
      let dataRow = data[index];
      dataRow = dataRow ? dataRow : []; // Converting to array if undefined
      dataRow = dataRow.concat(','.repeat(receiverData[0].length - dataRow.length).split(',')); // Filling spaces where the field is not filled

      let row = dataRow;
      row.splice(receiverData[0].length, 0, ...productsRow);
      return row;
    });

    const costIndex = data[0].length - 1;
    data[0][costIndex] = 'Total Cost';
    const costString = cost ? String(cost) : '0';
    data[1][costIndex] = costString + '€';

    console.log('Writing workbook ...', data);
    const workbook = await {
      SheetNames: ['Data'],
      Sheets: {
        Data: XLSX.utils.aoa_to_sheet(data)
      }
    };
    XLSX.writeFile(workbook, path.resolve(__dirname, '../files/formData.xlsx'));
    console.log('Workbook written');
    const buffers = await fs.readFileSync(path.resolve(__dirname, '../files/formData.xlsx'));


    const mailList = [
      keys.officeEmail_1,
      keys.officeEmail_2
    ];

    // Configurable for the 'to' property, since we want to send the same context to 2-3 different emails
    let mailOptions = await {
      from: 'auto@gpsupplies.gr',
      // to: keys.officeEmail,
      subject: 'GPSupplies - eLogistics',
      html: fullHtml,
      attachments: [
        {
          filename: 'excelOrder.xlsx',
          content: buffers
        }
      ]
    };

    console.log('Mail options configurured.');
    console.log('Sending email...');

    mailList.forEach((to, i, array) => {
      mailOptions.to = to;

      let mailResponse = '';
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.json({
            message: 'error'
          });
        } else {
          console.log('Message sent: ' + info.response);
          res.json({
            message: info.response
          });
          mailResponse = error || info.response;
        }
      });
      console.log(`Email Sending to ${to} Completed.`);
      console.log(`Response:${mailResponse}`);
    });
  });
};