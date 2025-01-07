import { createSlice } from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState: {
        isVisible: false
    },
    reducers: {
        setDropdownVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setDropdownVisible } = dropdownSlice.actions;
export default dropdownSlice.reducer;