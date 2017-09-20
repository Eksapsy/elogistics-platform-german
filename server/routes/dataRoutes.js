const stringify = require('json-stringify-safe');
const mongoose = require('mongoose');
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
};