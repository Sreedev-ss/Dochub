import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeApiCall } from '../../services/axios';


export const fetchUserDetails: any = createAsyncThunk(
  'auth/fetchUserDetails',
  async (email: string, { rejectWithValue }) => {
    try {
      const doctorData = async () => {
        return makeApiCall(`/doctor/get-doctor/${email}`, 'GET');
      };
      const response = await doctorData()
      console.log(response,'redux doc');
      
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IinitialState {
  isAuthenticated: boolean;
  user: object | null;
  error: string | null;
  loading: boolean
}

const initialState: IinitialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
}


export const authSlice:any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
