import { createSlice } from "@reduxjs/toolkit";

const phoneprojectsSlice = createSlice ({
    name: 'phoneprojects',
    initialState: {
        isVisible: false
    },
    reducers: {
        setPhoneProjectsVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setPhoneProjectsVisible } = phoneprojectsSlice.actions;
export default phoneprojectsSlice.reducer;