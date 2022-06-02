import { combineReducers, applyMiddleware,createStore } from "redux"

import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension";

import {
    productReducers,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    productReviewsReducer,
    reviewReducer
} from "./Reducers/productreducer";

import { cartReducer } from "./Reducers/CartReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer
} from "./Reducers/userReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./Reducers/OrderReducer";



const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review:reviewReducer,
});

let initialstate = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};


const middleware = [thunk];

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;