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
      }
    });

    /* HTML MESSAGE */
    const {sender, receiver, courier, products, cost, notes} = req.body;
    const scripts = '<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">';
    const hr = '<hr>';
    const header = "<i class=\"fa fa-shopping-cart fa-5x\" aria-hidden=\"true\"></i><h1>eLogistics Poimenidis Services</h1>";
    const senderHeader = `${sender ? `<h2>Αποστάλθηκε από ${sender}</h2>` : '<h1>No User Recorded</h1><p>If you think it\'s a problem report this. Recording sender is necessary in case someone messes up with an order.</p>'}`;
    const receiverHeader = `<h2>ΠΑΡΑΛΗΠΤΗΣ</h2><table><tr><th>ΟΝΟΜΑ</th><th>Α.Φ.Μ.</th><th>Δ.Ο.Υ.</th><th>ΤΟΠΟΘΕΣΙΑ</th><th>ΔΙΕΥΘΥΝΣΗ</th><th>Τ.Κ.</th><th>ΤΗΛ. #1</th></tr><tr><td>${receiver.name}</td><td>${receiver.vat_number}</td><td>${receiver.doy_number}</td><td>${receiver.location}</td><td>${receiver.address}</td><td>${receiver.zip}</td><td>${receiver.phone_1}</td></tr></table>`

    const courierHeader = `<h2>COURIER</h2><table><tr><th>ΟΝΟΜΑ</th><th>ΤΟΠΟΘΕΣΙΑ</th><th>ΤΗΛ.</th></tr><tr><td>${courier.name.toUpperCase()}</td><td>${courier.location}</td><td>${courier.phone}</td></tr></table>`

    const productHeader = '<h2>ΠΡΟΙΟΝΤΑ</h2>'

    const productsTable_START = '<table width=\'60%\' >';
    const productsTable_HEADERS = '<tr><th align=\'left\'>ΚΩΔΙΚΟΣ</th><th align=\'left\'>ΟΝΟΜΑ</th><th align=\'right\'>ΠΟΣΟΤΗΤΑ</th></tr>'
    let productsTable_PRODUCTS = '';

    try {
      products.forEach((product) => {
        productsTable_PRODUCTS += `<tr><td align=left'>${product.id || 'NULL' }</td><td align=\'left\'>${product.name || 'NULL'}</td><td align=\'right\'>${product.amount || 'NaN'}</td></tr>`;
      });
    } catch (e) {
      productsTable_PRODUCTS = '<tr><td align=\'left\'>NULL</td><td align=\'left\'>NULL</td><td align=\'right\'>NaN</td></tr>'
    }

    const productsTable_END = '</table>'

    const costHeader = `<h3>ΚΟΣΤΟΣ:</h3><strong>${cost ? String(cost + ' €') : '0 €'}</strong>`;

    const notesHeader = `<h3>ΣΗΜΕΙΩΣΕΙΣ:</h3>${notes}`;

    const footer = '<br/><hr><br/><strong>ΗΛΕΚΤΡΟΝΙΚΟ ΕΝΤΥΠΟ ΠΑΡΑΓΓΕΛΙΑΣ ΓΙΑ ΛΟΓΙΣΤΗΡΙΟ</strong><p font-size=\'6px\'>Services apostolis.anastasiou.alpha@gmail.com Apostolis Anastasiou</p>'
    const fullHtml = scripts + header + senderHeader + hr + receiverHeader + hr + courierHeader + hr + productHeader + productsTable_START + productsTable_HEADERS + productsTable_PRODUCTS + productsTable_END + costHeader + notesHeader + footer;

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


    const mailOptions = await {
      from: 'auto@gpsupplies.gr',
      to: keys.officeEmail,
      subject: 'ΓΕΡΜΑΝΟΣ ΠΟΙΜΕΝΙΔΗΣ - eLogistics',
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
    console.log('Process Completed.', mailResponse);
  });
};