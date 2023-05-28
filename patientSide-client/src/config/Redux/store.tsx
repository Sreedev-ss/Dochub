import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from './authSlice';
import loadingSlice from './loadingSlice';
import alertSlice from './alertSlice';

const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    loading: loadingSlice,
    alert: alertSlice
});


const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store) 
export default store;
