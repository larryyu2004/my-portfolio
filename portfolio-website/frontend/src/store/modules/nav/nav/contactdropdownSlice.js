import { createSlice } from "@reduxjs/toolkit";

const ContactdropdownSlice = createSlice({
    name: "Contactdropdown",
    initialState: {
        isVisible: false
    },
    reducers: {
        setContactDropdownVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setContactDropdownVisible } = ContactdropdownSlice.actions;
export default ContactdropdownSlice.reducer;