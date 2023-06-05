import { createSlice } from '@reduxjs/toolkit'

export const loading:any = createSlice({
    name: 'loading',
    initialState: {
        isloading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.isloading = true
        },
        hideLoading: (state) => {
            state.isloading = false
        }
    }

})
export const { hideLoading, showLoading } = loading.actions
export default loading.reducer;