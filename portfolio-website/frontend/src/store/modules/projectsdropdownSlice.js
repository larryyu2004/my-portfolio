import { createSlice } from "@reduxjs/toolkit";

const ProjectsdropdownSlice = createSlice({
    name: "Projectsdropdown",
    initialState: {
        ProjectsisVisible: false
    },
    reducers: {
        setProjectsDropdownVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setProjectsDropdownVisible } = ProjectsdropdownSlice.actions;
export default ProjectsdropdownSlice.reducer;