import { createSlice } from "@reduxjs/toolkit";
import { getParsedDataFromLocalStorage } from "../Components/Helper/Helper";

const RegisterSlice = createSlice({
  name: "Register",
  initialState: {
    register_data: null,
    register_loading: false,
    register_error: null,
    register_message: null,
    isAuthenticated: false,
  },
  reducers: {
    set_register_loading: (state, action) => {
      state.register_loading = action.payload;
    },
    set_register_data: (state, action) => {
      state.register_data = action.payload;
      state.isAuthenticated = true; // Assume user is authenticated upon successful registration
      state.register_message = action.payload;
    },
    set_register_error: (state, action) => {
      state.register_error = action.payload;
      state.isAuthenticated = false; 
      state.register_message = null;
    },
    set_register_message: (state, action) => {
      state.register_message = action.payload;
    },
    clear_register_error: (state) => {
      state.register_error = null;
    },
    clear_register_message: (state) => {
      state.register_message = null;
    },
    reset_register_state: (state) => {
      state.register_data = null;
      state.register_loading = false;
      state.register_error = null;
      state.register_message = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  set_register_data,
  set_register_loading,
  set_register_error,
  set_register_message,
  clear_register_error,
  clear_register_message,
  reset_register_state,
} = RegisterSlice.actions;



const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    login_data: getParsedDataFromLocalStorage("user_info") ||  null,
    login_loading: false,
    login_error: null,
    login_message: null,
    isAuthenticated: false,
  },
  reducers: {
    set_login_loading: (state, action) => {
      state.login_loading = action.payload;
    },
    set_login_data: (state, action) => {
      state.login_data = action.payload;
      state.isAuthenticated = true; // User is authenticated upon successful login
      state.login_message = action.payload;
    },
    set_login_error: (state, action) => {
      state.login_error = action.payload;
      state.login_message = null;
    },
    set_login_message: (state, action) => {
      state.login_message = action.payload;
    },
    clear_login_error: (state) => {
      state.login_error = null;
    },
    clear_login_message: (state) => {
      state.login_message = null;
    },
    logout_user: (state) => {
      state.login_data = null;
      state.isAuthenticated = false;
      state.login_message = "Successfully logged out.";
    },
  },
});

const Change_password_Slice = createSlice({
  name: "changePassword",
  initialState: {
    change_password_loading: false,
    change_password_success: null,
    change_password_error: null,
    change_password_message: null,
  },
  reducers: {
    set_change_password_loading: (state, action) => {
      state.change_password_loading = action.payload;
    },
    set_change_password_success: (state, action) => {
      state.change_password_success = action.payload;
      state.change_password_message = "Password changed successfully.";
    },
    set_change_password_error: (state, action) => {
      state.change_password_error = action.payload;
      state.change_password_message = null;
    },
    clear_change_password_error: (state) => {
      state.change_password_error = null;
    },
    clear_change_password_message: (state) => {
      state.change_password_message = null;
    },
  },
});

export const {
  set_change_password_loading,
  set_change_password_success,
  set_change_password_error,
  clear_change_password_error,
  clear_change_password_message,
} = Change_password_Slice.actions;
export const {
  set_login_data,
  set_login_loading,
  set_login_error,
  set_login_message,
  clear_login_error,
  clear_login_message,
  logout_user,
} = LoginSlice.actions;


export default {
    register: RegisterSlice.reducer,
    login: LoginSlice.reducer,
    change_pass: Change_password_Slice.reducer
};