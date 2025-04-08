import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../components/common/Client/Client";

export const fetchWomenProducts = createAsyncThunk(
  "product/fetchWomenProducts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/products/get-womenProducts", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setWomenProducts(response.data));
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch kids data"
      );
    }
  }
);

const womenProductSlice = createSlice({
  name: "womenProducts",
  initialState: {
    womenProducts: [],
  },
  reducers: {
    setWomenProducts: (state, action) => {
      state.womenProducts = action.payload;
    },
  },
});

export const { setWomenProducts } = womenProductSlice.actions;

export default womenProductSlice.reducer;
