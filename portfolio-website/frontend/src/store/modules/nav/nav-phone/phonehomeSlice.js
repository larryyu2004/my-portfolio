import { createSlice } from "@reduxjs/toolkit";

const phonehomeSlice = createSlice({
    name: 'phonehome',
    initialState: {
        isVisible: false
    },
    reducers: {
        setPhoneHomeVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setPhoneHomeVisible } = phonehomeSlice.actions;
export default phonehomeSlice.reducer;