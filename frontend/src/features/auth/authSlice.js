import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: localStorage.getItem("hasSession") === "true",
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user || action.payload;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        authLogout: (state) => {
            state.isLoading = false;
            state.user = null;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { authStart, authSuccess, authFailure, authLogout, setLoading } = authSlice.actions;
export default authSlice.reducer;