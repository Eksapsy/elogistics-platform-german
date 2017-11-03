const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const _ = require('lodash');

const Receiver = mongoose.model('receivers');
const Courier = mongoose.model('couriers');
const Product = mongoose.model('products');

module.exports = async (req, res, next) => {
	const workbook = XLSX.readFile(
		path.resolve(__dirname, '../uploads', 'diakritiko.xlsx')
	);

	if (req.body.replaceOldDatabase) {
		console.log('Removing old database.');
		await Receiver.remove((err, receiver) => {
			if (err) return res.send('Error replacing receivers.');
		});
		await Courier.remove((err, courier) => {
			if (err) return res.send('Error replacing couriers.');
		});
		await Product.remove((err, product) => {
			if (err) return res.send('Error replacing products.');
		});
		await console.log('Old Database Removed.');
	}

	await console.log('Workbook Parsed!');

	/* Saving Receivers */
	const receiver_ids = await getReceiverId(workbook);
	const receiver_names = await getReceiverNames(workbook);
	const receiver_emails = await getReceiverEmails(workbook);
	const receiver_couriers = await getReceiverCourier(workbook);
	const receiver_vat_numbers = await getReceiverVAT(workbook);
	const receiver_doy_numbres = await getReceiverDOY(workbook);
	const receiver_phones_1 = await getReceiverPhone_1(workbook);
	const receiver_phones_2 = await getReceiverPhone_2(workbook);
	const receiver_zip_numbers = await getReceiverZIP(workbook);
	const receiver_locations = await getReceiverLocation(workbook);
	const receiver_addresses = await getReceiverAddress(workbook);

	for (i = 0; i < receiver_names.length; i++) {
		const receiver = await new Receiver({
			r_id: receiver_ids[i],
			name: receiver_names[i],
			email: receiver_emails[i],
			courier: receiver_couriers[i],
			vat_number: receiver_vat_numbers[i],
			doy_number: receiver_doy_numbres[i],
			phone_1: receiver_phones_1[i],
			phone_2: receiver_phones_2[i],
			address: receiver_addresses[i],
			location: receiver_locations[i],
			zip: receiver_zip_numbers[i]
		}).save();
	}

	/* Saving Couriers */
	const courier_names = await getCourierNames(workbook);

	for (i = 0; i < courier_names.length; i++) {
		const courier = await new Courier({
			name: courier_names[i],
		}).save();
	}

	/* Saving Products */
	const product_id_array = await getProductIdArray(workbook);
	const product_names = await getProductName(workbook);

	for (i = 0; i < product_names.length; i++) {
		const product = await new Product({
			id: product_id_array[i],
			name: product_names[i]
		}).save();
	}

	await console.log('DATA SAVED IN DATABASE');


	next();
};


/* Receiver Sheet */
function getReceiverId(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	});
	return _.map(ws_json, 'ID');
}

function getReceiverNames(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');
}

function getReceiverEmails(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'EMAIL');
}

function getReceiverCourier(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'COURIER');
}

function getReceiverVAT(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'VAT NUMBER');
}

function getReceiverDOY(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'DOY NUMBER');
}

function getReceiverAddress(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'ADDRESS');
}

function getReceiverZIP(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'ZIP CODE');
}

function getReceiverLocation(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'LOCATION');
}

function getReceiverPhone_1(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'PHONE #1');
}

function getReceiverPhone_2(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Receivers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'PHONE #2');
}
/*------------*/


/* Courier Sheet */
function getCourierNames(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Couriers'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');
}
/*------------*/


/* Product Sheet */
function getProductIdArray(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Products'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'ID');
}

function getProductName(workbook) {
	if (!workbook) return;

	const ws = workbook.Sheets['Products'];
	const ws_json = XLSX.utils.sheet_to_json(ws, {
		header: 2
	}); // 3D Array, Header-Named Cells (eg. {NAME: "APOSTOLIS"})
	return _.map(ws_json, 'NAME');
}
/*------------*/