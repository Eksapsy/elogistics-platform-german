import axios from 'axios';
import { FETCH_FORM_DATA, POST_RECEIVER, POST_COURIER, POST_PRODUCT, ERROR } from './types';

export const addReceiver = (receiver) => async dispatch => {
	await axios.post('/api/postreceiver', {
		r_id: receiver.r_id,
		name: receiver.name,
		email: receiver.email,
		courier: receiver.courier,
		vat_number: receiver.vat_number,
		doy_number: receiver.doy_number,
		phone_1: receiver.phone_1,
		phone_2: receiver.phone_2,
		address: receiver.address,
		location: receiver.location,
		zip: receiver.zip
	})
	.catch(err => {
		console.error('Error received while trying to post receiver.');
		console.error(err);
		dispatch({
			type: ERROR,
			error: err.message,
			reload: true
		});
	});

	// Reloading the store with the new data
	const res = await axios.get('/api/getreceivers')
		.catch(err => {
			console.error('Error received while trying to fetch receivers.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});

	dispatch({
		type: POST_RECEIVER,
		receivers: res.data
	});
};

export const addCourier = (courier) => async dispatch => {
	await axios.post('/api/postcourier', {
		name: courier.name,
		location: courier.location,
		phone: courier.phone
	})
		.catch(err => {
			console.error('Error received while trying to posting courier.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});

	// Reloading the store with the new data
	const res = await axios.get('/api/getcouriers')
		.catch(err => {
			console.error('Error received while trying to fetch couriers.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});
	;

	dispatch({
		type: POST_COURIER,
		couriers: res.data
	});
};

export const addProduct = (id, name) => async dispatch => {
	await axios.post('/api/postproduct', {
		id,
		name
	})
		.catch(err => {
			console.error('Error received while posting a product.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});


	// Reloading the store with the new data
	const res = await axios.get('/api/getproducts')
		.catch(err => {
			console.error('Error received while trying to fetch products.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err,
				reload: true
			});
		});
	;

	dispatch({
		type: POST_PRODUCT,
		products: res.data
	});
};

export const fetchFormData = () => async dispatch => {
	const res_receivers = await axios.get('/api/getreceivers')
		.catch(err => {
			console.error('Error received while trying to fetch 1 of 3: receivers.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});
	;
	const res_couriers = await axios.get('/api/getcouriers')
		.catch(err => {
			console.error('Error received while trying to fetch 1 of 3: couriers.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});
	;
	const res_products = await axios.get('/api/getproducts')
		.catch(err => {
			console.error('Error received while trying to fetch 1 of 3: products.');
			console.error(err);
			dispatch({
				type: ERROR,
				error: err.message,
				reload: true
			});
		});
	;

	dispatch({
		type: FETCH_FORM_DATA,
		payload: {
			receivers: res_receivers.data,
			couriers: res_couriers.data,
			products: res_products.data
		}
	})
};