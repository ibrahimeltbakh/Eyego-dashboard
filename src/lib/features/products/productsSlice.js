
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../api/config';

const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/products`)
        return response.data
    } catch (error) {
        console.log(`Error Fitching Products ${error}`);
        return rejectWithValue(error.response?.data || error.message);
    }

})

const initialState = {
    products: [],
    loading: false,
    error: null
}
const productsSlice = createSlice({
    name: "products",
    initialState: initialState,

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products

        }).addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

    }


})

export { fetchProducts };
export default productsSlice.reducer
