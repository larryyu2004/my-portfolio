import { configureStore } from "@reduxjs/toolkit";
import HomedropdownReducer from "./modules/homedropdownSlice";
import themeReducer from "./modules/themeSlice";
import phonedropdownReducer from "./modules/phonedropdownSlice";
import phonedropupRecuder from "./modules/phonedropupSlice";
import ProjectsdropdownReducer from "./modules/projectsdropdownSlice";
import ContactdropdownReducer from "./modules/contactdropdownSlice";


export const store = configureStore({
    reducer: {
        Homedropdown: HomedropdownReducer,
        theme: themeReducer,
        phonedropdown: phonedropdownReducer,
        phonedropup: phonedropupRecuder,
        Projectsdropdown: ProjectsdropdownReducer,
        Contactdropdown: ContactdropdownReducer
    }
});