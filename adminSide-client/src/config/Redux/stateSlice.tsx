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
        },
        updateIndex:(state,action) => {
            state.currentIndex = action.payload
        }
    }
})

export const {updateState, updateIndex} = stateSlice.actions;
export default stateSlice.reducer;