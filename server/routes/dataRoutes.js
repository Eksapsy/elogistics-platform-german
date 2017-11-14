const stringify = require('json-stringify-safe');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const Sender = mongoose.model('senders');
const Receiver = mongoose.model('receivers');
const Courier = mongoose.model('couriers');
const Product = mongoose.model('products');

module.exports = (app) => {
	/* Receiver Routes */
	app.post(
		'/api/postreceiver',
		async (req, res) => {
			console.log('====================================');
			console.log('Saving new receiver');
			console.log(req.body);
			console.log('====================================');

			// Searching for a Receiver with either with same id or same name. Because ... it should not allowed to have duplicates
			const receiverWithSameID = await Receiver.find({
				r_id: req.body.r_id
			});
			const receiverWithSameName = await Receiver.find({
				name: req.body.name
			});
			console.log('====================================');
			console.log('Did found receiver?');
			console.log(receiverWithSameID);
			console.log(receiverWithSameName);
			console.log('====================================');
			if (receiverWithSameID.length || receiverWithSameName.length) {
				console.log('Overwritting a receiver that already exists');
				let receiver;
				const dataToOverwrite = {
					r_id: req.body.r_id,
					name: req.body.name,
					email: req.body.email,
					courier: req.body.courier,
					vat_number: req.body.vat_number,
					doy_number: req.body.doy_number,
					phone_1: req.body.phone_1,
					phone_2: req.body.phone_2,
					address: req.body.address,
					location: req.body.location,
					zip: req.body.zip
				};

				if (receiverWithSameID.length) {
					receiver = await Receiver.findOneAndUpdate({
						r_id: req.body.r_id
					}, dataToOverwrite, (err, doc, res) => {
						console.log('Error on overwritting receiver data based on ID');
						console.log(err);
					});
				} else {
					receiver = await Receiver.findOneAndUpdate({
						name: req.body.name
					}, dataToOverwrite, (err, doc, res) => {
						console.log('Error on overwritting receiver data based on Name');
						console.log(err);
					});
				}
				res.send(receiver);
			} else {
				const receiver = await new Receiver({
					r_id: req.body.r_id,
					name: req.body.name,
					email: req.body.email,
					courier: req.body.courier,
					vat_number: req.body.vat_number,
					doy_number: req.body.doy_number,
					phone_1: req.body.phone_1,
					phone_2: req.body.phone_2,
					address: req.body.address,
					location: req.body.location,
					zip: req.body.zip
				}).save().catch(err => {
					console.error('Error while Saving new Receiver');
					console.error(err);
				});


				res.send(receiver);
			}
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
		async (req, res) => {
			console.log('====================================');
			console.log('Saving new courier');
			console.log(req.body);
			console.log('====================================');

			// We don't want duplicates!
			const courierWithSameName = await Courier.find({
				name: req.body.name
			});

			if (courierWithSameName.length) {
				console.log('Overwritting a courier that already exists');
				const courier = await Courier.findOneAndUpdate({
					name: req.body.name
				}, {
					location: req.body.location,
					phone: req.body.phone
				}, (err, doc, res) => {
					console.log('Error on overwritting courier data');
					console.log(err);
				});

				res.send(courier);
			} else {
				const courier = await new Courier({
					name: req.body.name,
					location: req.body.location,
					phone: req.body.phone
				}).save().catch(err => {
					console.error('Error while Saving new Courier');
					console.error(err);
				});


				res.send(courier);
			}
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
		async (req, res) => {
			console.log('====================================');
			console.log('Saving new product');
			console.log(req.body);
			console.log('====================================');

			// We don't want duplicates!
			const productWithSameName = await Product.find({
				id: req.body.id
			});

			if (productWithSameName.length) {
				console.log('Overwritting a product that already exists');
				const product = await Product.findOneAndUpdate({
					id: req.body.id
				}, {
					name: req.body.name
				}, (err, doc, res) => {
					console.log('Error on overwritting product data');
					console.log(err);
				});

				res.send(product);
			} else {
				const product = await new Product({
					id: req.body.id,
					name: req.body.name
				}).save().catch(err => {
					console.error('Error while Saving new Product');
					console.error(err);
				});

				res.send(product);
			}
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
				['ID', 'NAME', 'EMAIL', 'VAT NUMBER', 'DOY NUMBER', 'ADDRESS', 'ZIP CODE', 'LOCATION', 'PHONE #1', 'PHONE #2']
			];
			let receiverData = await Receiver.find({});
			await receiverData.forEach((receiver) => {
				const data = [receiver.r_id, receiver.name, receiver.email, receiver.vat_number, receiver.doy_number, receiver.address, receiver.zip, receiver.location, receiver.phone_1, receiver.phone_2];
				receivers.push(data);
			});

			let couriers = [
				['NAME', 'LOCATION', 'PHONE']
			];
			let courierData = await Courier.find({});
			await courierData.forEach((courier) => {
				const data = [courier.name, courier.location, courier.phone];
				couriers.push(data);
			});

			let products = [
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

			await XLSX.writeFile(workbook, path.resolve(__dirname, '../files/elogisticsExport.xlsx'));

			res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
			res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			await res.download(path.resolve(__dirname, '../files/elogisticsExport.xlsx'), 'elogisticsExport.xlsx')
		}
	);
};