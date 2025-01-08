import { configureStore } from "@reduxjs/toolkit";
import HomedropdownReducer from "./modules/homedropdownSlice";
import themeReducer from "./modules/themeSlice";
import phonedropdownReducer from "./modules/phonedropdownSlice";
import ProjectsdropdownReducer from "./modules/projectsdropdownSlice";
import ContactdropdownReducer from "./modules/contactdropdownSlice";

export const store = configureStore({
    reducer: {
        Homedropdown: HomedropdownReducer,
        theme: themeReducer,
        phonedropdown: phonedropdownReducer,
        Projectsdropdown: ProjectsdropdownReducer,
        Contactdropdown: ContactdropdownReducer
    }
});