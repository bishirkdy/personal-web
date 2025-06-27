import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import cartReducer from '../redux/features/cartSlice'
import { createApiSlice } from './api/api';
// import { setupListeners } from '@reduxjs/toolkit/query';

export default configureStore({
    reducer: {
        auth : authReducer,
        cart : cartReducer,
        [createApiSlice.reducerPath] : createApiSlice.reducer
    },

    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(createApiSlice.middleware),
    devTools : true
})

// setupListeners(store.dispatch);