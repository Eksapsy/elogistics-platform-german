const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const _ = require('lodash');

const Sender   = mongoose.model('senders');
const Receiver = mongoose.model('receivers');
const Courier  = mongoose.model('couriers');
const Product  = mongoose.model('products');

module.exports = async (req, res, next) => {
	const workbook = XLSX.readFile(
			path.resolve(__dirname, '../uploads', 'diakritiko.xlsx')
	);

	await console.log('ReplaceOldDatabase: ', req.body.replaceOldDatabase);
	if (req.body.replaceOldDatabase) {
		console.log('Removing old database.');
		await Sender.remove((err, sender) => {
			if (err) return res.send('Error replacing senders.');
		});
		await Receiver.remove((err, sender) => {
			if (err) return res.send('Error replacing receivers.');
		});
		await Courier.remove((err, sender) => {
			if (err) return res.send('Error replacing couriers.');
		});
		await Product.remove((err, sender) => {
			if (err) return res.send('Error replacing products.');
		});
		await console.log('Old Database Removed.');
	}

	await console.log('Workbook Parsed!');

	/* Saving Senders */
	const sender_names  = await getSenderNames(workbook);
	const sender_emails = await getSenderEmails(workbook);

	for (i = 0; i < sender_names.length; i++) {
		const sender = await new Sender({
			name: sender_names[i],
			email: sender_emails[i] ? sender_emails[i] : 'noemail'
		}).save();
	}

	/* Saving Receivers */
	const receiver_names    = await getReceiverNames(workbook);
	const receiver_emails   = await getReceiverEmails(workbook);
	const receiver_couriers = await getReceiverCourier(workbook);

	for (i = 0; i < receiver_names.length; i++) {
		const receiver = await new Receiver({
			name: receiver_names[i],
			email: receiver_emails[i] ? receiver_emails[i] : 'noemail',
			courier: receiver_couriers[i]
		}).save();
	}

	/* Saving Couriers */
	const courier_names  = await getCourierNames(workbook);

	for (i = 0; i < courier_names.length; i++) {
		const courier = await new Courier({
			name: courier_names[i],
		}).save();
	}

	/* Saving Products */
	const product_id_array  = await getProductIdArray(workbook);
	const product_names     = await getProductName(workbook);

	for (i = 0; i < product_names.length; i++) {
		const product = await new Product({
			id: product_id_array[i],
			name: product_names[i]
		}).save();
	}

	await console.log('DATA SAVED IN DATABASE');


	next();
};

/* Sender Sheet */
function getSenderNames(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Senders'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');

}

function getSenderEmails(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Senders'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'EMAIL');
}
/*------------*/


/* Receiver Sheet */
function getReceiverNames(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');
}

function getReceiverEmails(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'EMAIL');
}

function getReceiverCourier(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'Courier');
}
/*------------*/


/* Courier Sheet */
function getCourierNames(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Couriers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');
}
/*------------*/


/* Product Sheet */
function getProductIdArray(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Products'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'ID');
}

function getProductName(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Products'];
	const ws_json = XLSX.utils.sheet_to_json(ws, { header: 2 }); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');
}
/*------------*/