import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import cart from './AddToCart'

const combinedReducer = combineReducers({
  cart: cart
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      cart: {
        cart: state.cart.cart,
        total: state.cart.total
      },
      // apply delta from hydration
    };

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => configureStore({
  reducer: reducer
})

export const store = createWrapper(makeStore, { debug: true });