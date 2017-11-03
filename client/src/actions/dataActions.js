import axios from 'axios';
import { FETCH_FORM_DATA, POST_RECEIVER, POST_COURIER, POST_PRODUCT } from './types';

export const addReceiver = (receiver) => async dispatch => {
	await axios.post('/api/postreceiver', {
		r_id: receiver.r_id,
		name: receiver.name,
		email: receiver.email,
		courier: receiver.courier,
		vat_number: receiver.vat_number,
		phone_1: receiver.phone_1,
		phone_2: receiver.phone_2,
		address: receiver.address,
		location: receiver.location,
		zip: receiver.zip
	});

	// Reloading the store with the new data
	const res = await axios.get('/api/getreceivers');

	dispatch({
		type: POST_RECEIVER,
		receivers: res.data
	});
};

export const addCourier = (name) => async dispatch => {
	await axios.post('/api/postcourier', {
		name
	});

	// Reloading the store with the new data
	const res = await axios.get('/api/getcouriers');

	dispatch({
		type: POST_COURIER,
		couriers: res.data
	});
};

export const addProduct = (id, name) => async dispatch => {
	await axios.post('/api/postproduct', {
		id,
		name
	});

	// Reloading the store with the new data
	const res = await axios.get('/api/getproducts');

	dispatch({
		type: POST_PRODUCT,
		products: res.data
	});
};

export const fetchFormData = () => async dispatch => {
	const res_receivers = await axios.get('/api/getreceivers');
	const res_couriers = await axios.get('/api/getcouriers');
	const res_products = await axios.get('/api/getproducts');

	dispatch({
		type: FETCH_FORM_DATA,
		payload: {
			receivers: res_receivers.data,
			couriers: res_couriers.data,
			products: res_products.data
		}
	})
};