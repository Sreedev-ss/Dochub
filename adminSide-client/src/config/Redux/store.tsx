import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authSlice from './authslice';
import stateSlice from './stateSlice'; 
import loadingSlice from './loadingSlice';
import alertSlice from './alertSlice';
import notificationSlice from './notificationSlice';

const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    auth:persistReducer(persistConfig, authSlice),
    state:stateSlice,
    loading:loadingSlice,
    alert: alertSlice,
    notification:notificationSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store) 
export default store;
