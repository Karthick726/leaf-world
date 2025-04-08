import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../components/common/Client/Client";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/products/get-menProducts", { withCredentials: true });
  
      if(response.status===200){
        dispatch(setMenProducts(response.data));
        return response.data
      }

  
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user data");
    }
  });


  const productSlice = createSlice({
    name: "menProducts",
    initialState: {
      menProducts: [],
    },
    reducers: {
      setMenProducts: (state, action) => {
        state.menProducts = action.payload;  
        },
    },  
  });
  
  
  export const { setMenProducts } = productSlice.actions;
  
  export default productSlice.reducer;