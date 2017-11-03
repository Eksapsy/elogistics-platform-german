const mongoose = require('mongoose');
const {Schema} = mongoose;

// Email IS required. Reverse it immediately after product is done
const Receiver = new Schema({
	r_id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	vat_number: {
		type: String,
		required: true
	},
	doy_number: {
		type: String,
		required: false
	},
	phone_1: {
		type: String,
		required: false
	},
	phone_2: {
		type: String,
		required: false
	},
	address: {
		type: String,
		required: false
	},
	location: {
		type: String,
		required: false
	},
	zip: {
		type: String,
		required: false
	},
	courier: String
});

const Courier = new Schema({
	name: {
		type: String,
		required: true
	}
});

const Products = new Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

mongoose.model('receivers', Receiver);
mongoose.model('couriers', Courier);
mongoose.model('products', Products);