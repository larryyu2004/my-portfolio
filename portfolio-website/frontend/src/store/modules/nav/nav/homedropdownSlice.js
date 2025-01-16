import { createSlice } from "@reduxjs/toolkit";

const HomedropdownSlice = createSlice({
    name: "Homedropdown",
    initialState: {
        isVisible: false
    },
    reducers: {
        setHomeDropdownVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setHomeDropdownVisible } = HomedropdownSlice.actions;
export default HomedropdownSlice.reducer;