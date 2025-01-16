import { configureStore } from "@reduxjs/toolkit";
import HomedropdownReducer from "./modules/nav/nav/homedropdownSlice";
import themeReducer from "./modules/nav/themeSlice";
import phonedropdownReducer from "./modules/nav/nav-phone/phonedropdownSlice";
import phonedropupRecuder from "./modules/nav/nav-phone/phonedropupSlice";
import ProjectsdropdownReducer from "./modules/nav/nav/projectsdropdownSlice";
import ContactdropdownReducer from "./modules/nav/nav/contactdropdownSlice";
import phonehomeSliceReducer from "./modules/nav/nav-phone/phonehomeSlice";
import phoneprojectSliceReducer from "./modules/nav/nav-phone/phoneprojectsSlice"



export const store = configureStore({
    reducer: {
        Homedropdown: HomedropdownReducer,
        theme: themeReducer,
        phonedropdown: phonedropdownReducer,
        phonedropup: phonedropupRecuder,
        Projectsdropdown: ProjectsdropdownReducer,
        Contactdropdown: ContactdropdownReducer,
        phonehome: phonehomeSliceReducer,
        phoneprojects: phoneprojectSliceReducer
    }
});