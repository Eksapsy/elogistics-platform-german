import { CHANGE_SENDER, CHANGE_RECEIVER, CHANGE_COURIER, CHANGE_PRODUCTS } from '../actions/types';

const initialState = {
	sender: '',
	receiver: '',
	courier: '',
	products: []
};

export default (state = initialState, action) => {
	switch (action.types) {
		case CHANGE_SENDER:
			return {
				...state,
				sender: action.sender
			};
		case CHANGE_RECEIVER:
			return {
				...state,
				receiver: action.receiver
			};
		case CHANGE_COURIER:
			return {
				...state,
				courier: action.courier
			};
		case CHANGE_PRODUCTS:
			return {
				...state,
				products: {
					...state.products,
					...action.products
				}
			};

		default:
			return state;
	}
}