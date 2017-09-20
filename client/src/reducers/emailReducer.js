import { FETCH_FORM_DATA, POST_SENDER, POST_RECEIVER, POST_COURIER, POST_PRODUCT } from '../actions/types';
import axios from 'axios';

const initialState = {
  senders: [],
  receivers: [],
  couriers: [],
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORM_DATA:
      return {
        senders: action.payload.senders,
        receivers: action.payload.receivers,
        couriers: action.payload.couriers,
        products: action.payload.products
      }
    case POST_SENDER:
      return {
        ...state,
        senders: state.senders.concat(action.senders)
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