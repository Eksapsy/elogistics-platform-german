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