import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./modules/dropdownSlice";
import themeReducer from "./modules/themeSlice";
import phonedropdownReducer from "./modules/phonedropdownSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        theme: themeReducer,
        phonedropdown: phonedropdownReducer
    }
});