import { FETCH_FORM_DATA, POST_RECEIVER, POST_COURIER, POST_PRODUCT } from '../actions/types';

const initialState = {
  receivers: [],
  couriers: [],
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORM_DATA:
      return {
        receivers: action.payload.receivers,
        couriers: action.payload.couriers,
        products: action.payload.products
      };
    case POST_RECEIVER:
      return {
        ...state,
        receivers: state.receivers.concat(action.receivers)
      };
    case POST_COURIER:
      return {
        ...state,
        couriers: state.couriers.concat(action.couriers)
      };
    case POST_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.products)
      };
    default:
      return state;
  }
};