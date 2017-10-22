import { CHANGE_SENDER, CHANGE_RECEIVER, CHANGE_COURIER, CHANGE_PRODUCTS, CHANGE_COST, TOGGLE_LOADER } from '../actions/types';

const initialState = {
	sender: '',
	receiver: {},
	courier: '',
	products: [],
	cost: '',
	loading: false
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
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
				products: action.products
			};
		case CHANGE_COST:
			return {
				...state,
				cost: action.cost
			}
		case TOGGLE_LOADER:
			return {
				...state,
				loading: action.loading ? action.loading : !state.loading
			};

		default:
			return state;
	}
}