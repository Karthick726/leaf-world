import { configureStore } from "@reduxjs/toolkit";
import menproductReducer from "./productSlice";
import KidproductReducer from "./kidsProductSlice";
import womenproductReducer from "./womenProductSlice";

const store = configureStore({
  reducer: {
    menProducts: menproductReducer,
    kidsProducts: KidproductReducer,
    womenProducts: womenproductReducer,
  },
});

export default store;
