import { createSlice } from '@reduxjs/toolkit';

const phonedropupSlice = createSlice({
    name: 'phonedropup',
    initialState: {
        isVisible: false
    },
    reducers: {
        setPhonedropupVisible: (state, action) => {
            state.isVisible = action.payload;
        }
    }
});

export const { setPhonedropupVisible } = phonedropupSlice.actions;
export default phonedropupSlice.reducer;