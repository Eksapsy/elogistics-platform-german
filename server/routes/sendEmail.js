const nodemailer = require('nodemailer');
const axios = require('axios');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
  app.post('/api/post-order-excel', (req, res) => {


  });

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
    const {receiver, courier, products} = req.body;
    const scripts = '<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">';
    const hr = '<hr>';
    const header = "<i class=\"fa fa-shopping-cart fa-5x\" aria-hidden=\"true\"></i><h1>ΓΕΡΜΑΝΟΣ ΠΟΙΜΕΝΙΔΗΣ - ORDER</h1>";
    let courierName = '';
    let receiverName = '';
    try {
      courierName = courier.toUpperCase();
    } catch (e) {
      courierName = 'NONE'
    };
    try {
      receiverName = receiver.toUpperCase();
    } catch (e) {
      receiverName = 'NONE'
    };
    const receiverHeader = '<h2>RECEIVER<h2/><h3>' + receiverName + '</h3>'
    const courierHeader = '<h2>COURIER</h2><h3>' + courierName + '</h3>';
    const productHeader = '<h2>PRODUCTS</h2>'

    const productsTable_START = '<table width=\'60%\' >';
    const productsTable_HEADERS = '<tr><th align=\'left\'>PRODUCT ID</th><th align=\'left\'>PRODUCT NAME</th><th align=\'right\'>PRODUCT AMOUNT</th></tr>'
    let productsTable_PRODUCTS = '';

    try {
      products.forEach((product) => {
        productsTable_PRODUCTS += `<tr><td align=left'>${product.id || 'NULL' }</td><td align=\'left\'>${product.name || 'NULL'}</td><td align=\'right\'>${product.amount || 'NaN'}</td></tr>`;
      });
    } catch (e) {
      productsTable_PRODUCTS = '<tr><td align=\'left\'>NULL</td><td align=\'left\'>NULL</td><td align=\'right\'>NaN</td></tr>'
    }

    const productsTable_END = '</table>'

    const footer = '<br/><hr><br/><strong>ΗΛΕΚΤΡΟΝΙΚΟ ΕΝΤΥΠΟ ΠΑΡΑΓΓΕΛΙΑΣ ΓΙΑ ΛΟΓΙΣΤΗΡΙΟ</strong><p font-size=\'6px\'>Services apostolis.anastasiou.alpha@gmail.com Apostolis Anastasiou</p>'
    const fullHtml = scripts + header + hr + receiverHeader + hr + courierHeader + hr + productHeader + productsTable_START + productsTable_HEADERS + productsTable_PRODUCTS + productsTable_END + footer;

    /* Attachment Buffer  */
    console.log('Preparing Excel File for Form Data ...');
    const receiverData = [
      ['Receiver', 'Courier'],
      [receiver, courier]
    ];
    let productsData = [
      ['Product ID', 'Product Name', 'Product Amount'],
    ];

    productsData = await productsData.concat(products.map((product) => {
      return [product.id, product.name, product.amount];
    }));

    console.log('Writing workbook ...');
    const workbook = await {
      SheetNames: ['ReceiverData', 'ProductsData'],
      Sheets: {
        ReceiverData: XLSX.utils.aoa_to_sheet(receiverData),
        ProductsData: XLSX.utils.aoa_to_sheet(productsData)
      }
    };
    XLSX.writeFile(workbook, path.resolve(__dirname, '../files/formData.xlsx'));
    console.log('Workbook written');
    const buffers = await fs.readFileSync(path.resolve(__dirname, '../files/formData.xlsx'));


    const mailOptions = await {
      from: 'auto@gpsupplies.gr',
      to: 'michael.tolis@gmail.com', // FIX: Change to Logistic's Email
      subject: 'ΓΕΡΜΑΝΟΣ ΠΟΙΜΕΝΙΔΗΣ - ORDER',
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