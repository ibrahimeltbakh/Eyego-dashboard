
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../api/config"

const initialState = {
    user: null,
    loading: false,
    error: null
}

const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        });
        return response.data
    }
    catch (err) {
        console.log(err.response?.data);
        return rejectWithValue(err.response?.data || "somthing went wrong")

    }
});

const register = createAsyncThunk("auth/register", async ({ name, email, password, confirmPassword, address, phone }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            name,
            email,
            password,
            confirmPassword,
            address,
            phone,
        });
        return response.data
    }
    catch (err) {
        console.log(err.response?.data);
        return rejectWithValue(err.response?.data || "somthing went wrong")

    }
})
const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions;

export { login, register, getUser }
export default authSlice.reducer;