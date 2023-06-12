import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice:any = createSlice({
    name:'Notification',
    initialState:{
        count:0,
    },
    reducers:{
        updateCount:(state,action) => {
            state.count = action.payload
        }
    }
})

export const {updateCount} = notificationSlice.actions;
export default notificationSlice.reducer;