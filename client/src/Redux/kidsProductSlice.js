import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../components/common/Client/Client";

export const fetchKidProducts = createAsyncThunk("product/fetchKidsProducts", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/products/get-kidsProducts", { withCredentials: true });
  
      if(response.status===200){
        dispatch(setKidsProducts(response.data));
        return response.data
      }

  
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch kids data");
    }
  });


  const kidsProductSlice = createSlice({
    name: "kidsProducts",
    initialState: {
      kidsProducts: [],
    },
    reducers: {
        setKidsProducts: (state, action) => {
        state.kidsProducts = action.payload;  
        },
    },
   
  });
  
  
  export const { setKidsProducts } = kidsProductSlice.actions;
  
  export default kidsProductSlice.reducer;