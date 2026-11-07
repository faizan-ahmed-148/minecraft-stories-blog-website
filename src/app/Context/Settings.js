import { createSlice } from "@reduxjs/toolkit";



const SettingsSlice = createSlice({
    name:"Settings",
    initialState:{
        settings_data:null,
        settings_loading: false,
        settings_error:null,
        settings_clear_error: null
    },
    reducers:{
        set_settings_loading: (state, action) => {
            state.settings_loading = action.payload
        },
        set_settings_data: (state, action) => {
            state.settings_data = action.payload
        },
        set_settings_error: (state, action) => {
            state.settings_error = action.payload
        },
        set_settings_clear_error: (state, action) => {
            state.settings_error = null
        },
    }
})

export const {
    set_settings_data,
    set_settings_error,
    set_settings_loading,
    set_settings_clear_error
} = SettingsSlice.actions

export default SettingsSlice.reducer