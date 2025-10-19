"use client";

import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './features/auth/authSlice'
import productsReducer from './features/products/productsSlice'
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    products: productsReducer
  },
})