import { createSlice } from "@reduxjs/toolkit";

export const stateSlice:any = createSlice({
    name:'state',
    initialState:{
        currentState:false,
        currentIndex:null
    },
    reducers:{
        updateState:(state,action) => {
            state.currentState = action.payload
        }
    }
})

export const {updateState} = stateSlice.actions;
export default stateSlice.reducer;