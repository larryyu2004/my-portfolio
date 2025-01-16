import { createSlice } from "@reduxjs/toolkit";

const phonedropdownSlice = createSlice({
    name: "phonedropdown",
    initialState: {
        isVisible: false
    },
    reducers: {
        setPhonedropdownVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setPhonedropdownVisible } = phonedropdownSlice.actions;
export default phonedropdownSlice.reducer;