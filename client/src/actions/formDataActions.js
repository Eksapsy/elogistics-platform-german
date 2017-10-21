import { CHANGE_SENDER, CHANGE_RECEIVER, CHANGE_COURIER, CHANGE_PRODUCTS, TOGGLE_LOADER } from './types';

export const changeSender = (sender) => async dispatch => {
	dispatch(
		{
			type: CHANGE_SENDER,
			sender
		}
	);
};

export const changeReceiver = (receiver) => async dispatch => {
	dispatch(
		{
			type: CHANGE_RECEIVER,
			receiver
		}
	);
};

export const changeCourier = (courier) => async dispatch => {
	dispatch(
		{
			type: CHANGE_COURIER,
			courier
		}
	);
};

export const changeProducts = (products) => async dispatch => {
	dispatch(
		{
			type: CHANGE_PRODUCTS,
			products
		}
	);
};

export const toggleLoader = (loading = undefined) => async dispatch => {
	dispatch({
		type: TOGGLE_LOADER,
		loading
	})
};