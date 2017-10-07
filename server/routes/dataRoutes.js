const stringify = require('json-stringify-safe');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const Sender = mongoose.model('senders');
const Receiver = mongoose.model('receivers');
const Courier = mongoose.model('couriers');
const Product = mongoose.model('products');

module.exports = (app) => {
	/* Sender Routes */
	app.post(
		'/api/postsender',
		(req, res) => {
			const sender = new Sender({
				name: req.body.name,
				email: req.body.email
			}).save();

			res.send(sender);
		}
	);

	app.get(
		'/api/getsenders',
		(req, res) => {
			let products = {};
			Sender.find({}, (err, data) => {
				res.send(data);
			});
		}
	);


	/* Receiver Routes */
	app.post(
		'/api/postreceiver',
		(req, res) => {
			const receiver = new Receiver({
				name: req.body.name,
				email: req.body.email,
				courier: req.body.courier || ""
			}).save();

			res.send(receiver);
		}
	);

	app.get(
		'/api/getreceivers',
		(req, res) => {
			let products = {};
			Receiver.find({}, (err, data) => {
				res.send(data);
			});
		}
	);


	/* Courier Routes */
	app.post(
		'/api/postcourier',
		(req, res) => {
			const courier = new Courier({
				name: req.body.name
			}).save();

			res.send(courier);
		}
	);

	app.get(
		'/api/getcouriers',
		(req, res) => {
			let products = {};
			Courier.find({}, (err, data) => {
				res.send(data);
			});
		}
	);


	/* Product Routes*/
	app.post(
		'/api/postproduct',
		(req, res) => {
			const product = new Product({
				id: req.body.id,
				name: req.body.name
			}).save();

			res.send(product);
		}
	);

	app.get(
		'/api/getproducts',
		(req, res) => {
			let products = {};
			Product.find({}, (err, data) => {
				res.send(data);
			});
		}
	);

	app.get(
		'/api/downloadexcel',
		async (req, res) => {
			let receivers = [
				['ID', 'NAME', 'EMAIL', 'VAT NUMBER', 'ADDRESS', 'ZIP CODE', 'LOCATION', 'PHONE #1', 'PHONE #2']
			];
			let receiverData = await Receiver.find({});
			await receiverData.forEach((receiver) => {
				const data = [receiver.r_id, receiver.name, receiver.email, receiver.vat, receiver.address, receiver.zip, receiver.location, receiver.phone_a, receiver.phone_b];
				receivers.push(data);
			});

			const couriers = [
				['NAME', 'PHONE', 'EMAIL']
			];
			let courierData = await Courier.find({});
			await courierData.forEach((courier) => {
				const data = [courier.name, courier.phone, courier.email];
				couriers.push(data);
			});

			const products = [
				['ID', 'NAME']
			];
			let productData = await Product.find({});
			await productData.forEach((product) => {
				const data = [product.id, product.name];
				products.push(data);
			});

			const Sheets = {
				Receivers: XLSX.utils.aoa_to_sheet(receivers),
				Couriers: XLSX.utils.aoa_to_sheet(couriers),
				Products: XLSX.utils.aoa_to_sheet(products)
			};
			const workbook = {
				SheetNames: ['Receivers', 'Couriers', 'Products'],
				Sheets
			};
			await XLSX.writeFile(workbook, path.resolve(__dirname, '../files/orderExport.xlsx'));

			res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
			res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			await res.download(path.resolve(__dirname, '../files/orderExport.xlsx'), 'orderExport.xlsx');
		}
	);
};