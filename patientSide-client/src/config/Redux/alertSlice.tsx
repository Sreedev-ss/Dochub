import { createSlice } from '@reduxjs/toolkit'

export const alertSlice:any = createSlice({
    name:'alert',
    initialState: {
        message:null,
        show:false
    },
    reducers:{
        showAlert: (state,action) => {
            state.show = true
            state.message = action.payload
        },
        hideAlert: (state) => {
            state.show = false
        }
    }
})

export const { showAlert,hideAlert} = alertSlice.actions;

export default alertSlice.reducer;