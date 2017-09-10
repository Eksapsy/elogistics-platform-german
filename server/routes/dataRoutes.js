const mongoose = require('mongoose');
const Sender = mongoose.model('senders');
const Receiver = mongoose.model('receivers');
const Courier = mongoose.model('couriers');
const Product = mongoose.model('products');

module.exports = (app) => {
	app.post(
			'/api/postsender',
			(req, res) => {
				const sender = new Sender({ name: req.body.name, email: req.body.email }).save();
				res.send(sender);
			}
	);

	app.post(
			'/api/postreceiver',
			(req, res) => {
				const receiver = new Receiver({ name: req.name, email: req.email, courier: req.courier || ""}).save();
				res.send(receiver);
			}
	);

	app.post(
			'/api/postcourier',
			(req, res) => {
				const courier = new Courier({ name: req.name }).save();
				res.send(courier);
			}
	);

	app.post(
			'/api/postproduct',
			(req, res) => {
				const product = new Product({ name: req.name }).save();
				res.send(product);
			}
	);

	app.get('/api/random',
			(req, res) => {
				res.send('Random Shit');
			}
	);
};