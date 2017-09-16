const mongoose = require('mongoose');
const {Schema} = mongoose;

const Sender = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true}
});
const Receiver = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	courier: String
});

const Courier = new Schema({
	name: {type: String, required: true}
});

const Products = new Schema({
	id: {type: String, required: true},
	name: {type: String, required: true}
});

mongoose.model('senders', Sender);
mongoose.model('receivers', Receiver);
mongoose.model('couriers', Courier);
mongoose.model('products', Products);