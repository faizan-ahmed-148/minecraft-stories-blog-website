
import { createSlice } from "@reduxjs/toolkit";

const edit_profileSlice = createSlice({
    name: 'edit_profile',
    initialState: {
        edit_profile_data: null,               // Stores the edit_profile data (or list of edit_profiles)
        edit_profile_loading: false,           // Loading state when fetching or creating edit_profiles
        edit_profile_error: null,              // Error state for edit_profiles
        edit_profile_message: null,            // Message related to edit_profile creation or fetching
        edit_profile_clear_error: null,        // State to trigger clearing of error messages
        edit_profile_clear_message: null,      // State to trigger clearing of success messages
    },
    reducers: {
        // Sets the loading state for edit_profiles (either creating or fetching)
        set_edit_profile_loading: (state, action) => {
            state.edit_profile_loading = action.payload;
        },

        // Sets the edit_profile data (for fetched or created edit_profiles)
        set_edit_profile_data: (state, action) => {
            state.edit_profile_data = action.payload;
        },

        // Sets the error for edit_profile fetch or creation
        set_edit_profile_error: (state, action) => {
            state.edit_profile_error = action.payload;
        },

        // Clears the error state
        set_edit_profile_clear_error: (state, action) => {
            state.edit_profile_error =null;
        },

        // Sets the message (e.g., for successful creation or update)
        set_edit_profile_message: (state, action) => {
            state.edit_profile_message = action.payload;
        },

        // Clears the message state
        set_edit_profile_clear_message: (state, action) => {
            state.edit_profile_message = null;
        },
    },
});

export const {
    set_edit_profile_loading,
    set_edit_profile_data,
    set_edit_profile_error,
    set_edit_profile_clear_error,
    set_edit_profile_message,
    set_edit_profile_clear_message
} = edit_profileSlice.actions


// Recent Posts Slice
const get_all_categoriesSlice = createSlice({
    name: "get_all_categories",
    initialState: {
        get_all_categories_data: null,
        get_all_categories_loading: false,
        get_all_categories_error: null,
        get_all_categories_clear_error: null,
    },
    reducers: {
        set_get_all_categories_loading: (state, action) => {
            state.get_all_categories_loading = action.payload;
        },
        set_get_all_categories_data: (state, action) => {
            state.get_all_categories_data = action.payload;
        },
        set_get_all_categories_error: (state, action) => {
            state.get_all_categories_error = action.payload;
        },
        set_get_all_categories_clear_error: (state, action) => {
            state.get_all_categories_error = null;
        },
    },
});

export const {
    set_get_all_categories_data,
    set_get_all_categories_error,
    set_get_all_categories_loading,
    set_get_all_categories_clear_error,
} = get_all_categoriesSlice.actions;



// Recent Posts Slice
const get_Post_by_category_Slice = createSlice({
    name: "get_all_categories",
    initialState: {
        get_Post_by_category_data: null,
        get_Post_by_category_loading: false,
        get_Post_by_category_error: null,
        get_Post_by_category_clear_error: null,
    },
    reducers: {
        set_get_Post_by_category_loading: (state, action) => {
            state.get_Post_by_category_loading = action.payload;
        },
        set_get_Post_by_category_data: (state, action) => {
            state.get_Post_by_category_data = action.payload;
        },
        set_get_Post_by_category_error: (state, action) => {
            state.get_Post_by_category_error = action.payload;
        },
        set_get_Post_by_category_clear_error: (state, action) => {
            state.get_Post_by_category_error = null;
        },
    },
});

export const {
    set_get_Post_by_category_data,
    set_get_Post_by_category_error,
    set_get_Post_by_category_loading,
    set_get_Post_by_category_clear_error,
} = get_Post_by_category_Slice.actions;


const getFeaturedPostSlice = createSlice({
    name: 'get_featured_post',
    initialState: {
        featured_post_data: null,
        featured_post_loading: false,
        featured_post_error: null,
        featured_post_clear_error: null,
    },
    reducers: {
        set_featured_post_loading: (state, action) => {
            state.featured_post_loading = action.payload;
        },
        set_featured_post_data: (state, action) => {
            state.featured_post_data = action.payload;
        },
        set_featured_post_error: (state, action) => {
            state.featured_post_error = action.payload;
        },
        set_featured_post_clear_error: (state, action) => {
            state.featured_post_error = null;
        },
    },
});

export const {
    set_featured_post_loading,
    set_featured_post_data,
    set_featured_post_error,
    set_featured_post_clear_error,
} = getFeaturedPostSlice.actions;


const getActivitiesSlice = createSlice({
    name: 'get_activities',
    initialState: {
        activities_data: null,
        activities_loading: false,
        activities_error: null,
        activities_clear_error: null,
    },
    reducers: {
        set_activities_loading: (state, action) => {
            state.activities_loading = action.payload;
        },
        set_activities_data: (state, action) => {
            state.activities_data = action.payload;
        },
        set_activities_error: (state, action) => {
            state.activities_error = action.payload;
        },
        set_activities_clear_error: (state, action) => {
            state.activities_error = null;
        },
    },
});

export const {
    set_activities_loading,
    set_activities_data,
    set_activities_error,
    set_activities_clear_error,
} = getActivitiesSlice.actions;


const submitContactUsSlice = createSlice({
    name: 'submit_contact_us',
    initialState: {
        contact_us_data: null,
        contact_us_loading: false,
        contact_us_error: null,
        contact_us_clear_error: null,
        contact_us_message: null,
        contact_us_clear_message: null,
    },
    reducers: {
        set_contact_us_loading: (state, action) => {
            state.contact_us_loading = action.payload;
        },
        set_contact_us_data: (state, action) => {
            state.contact_us_data = action.payload;
        },
        set_contact_us_error: (state, action) => {
            state.contact_us_error = action.payload;
        },
        set_contact_us_clear_error: (state, action) => {
            state.contact_us_error = null;
        },
        set_contact_us_message: (state, action) => {
            state.contact_us_message = action.payload;
        },
        set_contact_us_clear_message: (state, action) => {
            state.contact_us_message = null;
        },
    },
});

export const {
    set_contact_us_loading,
    set_contact_us_data,
    set_contact_us_error,
    set_contact_us_clear_error,
    set_contact_us_clear_message,
    set_contact_us_message
} = submitContactUsSlice.actions;

const newsletterSubscriptionSlice = createSlice({
    name: 'newsletter_subscription',
    initialState: {
        newsletter_data: null,
        newsletter_loading: false,
        newsletter_error: null,
        newsletter_clear_error: null,
        newsletter_message: null,
        newsletter_clear_message: null,
    },
    reducers: {
        set_newsletter_loading: (state, action) => {
            state.newsletter_loading = action.payload;
        },
        set_newsletter_data: (state, action) => {
            state.newsletter_data = action.payload;
        },
        set_newsletter_error: (state, action) => {
            state.newsletter_error = action.payload;
        },
        set_newsletter_clear_error: (state, action) => {
            state.newsletter_error = null;
        },
        set_newsletter_message: (state, action) => {
            state.newsletter_message = action.payload;
        },
        set_newsletter_clear_message: (state, action) => {
            state.newsletter_message = null;
        },
    },
});

export const {
    set_newsletter_loading,
    set_newsletter_data,
    set_newsletter_error,
    set_newsletter_clear_error,
    set_newsletter_message,
    set_newsletter_clear_message
} = newsletterSubscriptionSlice.actions;

const registerFirebaseTokenSlice = createSlice({
    name: 'register_firebase_token',
    initialState: {
        firebase_token_data: null,
        firebase_token_loading: false,
        firebase_token_error: null,
        firebase_token_clear_error: null,
        firebase_token_message: null,
        firebase_token_clear_message: null,
    },
    reducers: {
        set_firebase_token_loading: (state, action) => {
            state.firebase_token_loading = action.payload;
        },
        set_firebase_token_data: (state, action) => {
            state.firebase_token_data = action.payload;
        },
        set_firebase_token_error: (state, action) => {
            state.firebase_token_error = action.payload;
        },
        set_firebase_token_clear_error: (state, action) => {
            state.firebase_token_error = null;
        },
        set_firebase_token_message: (state, action) => {
            state.firebase_token_message = action.payload;
        },
        set_firebase_token_clear_message: (state, action) => {
            state.firebase_token_message = null;
        },
    },
});

export const {
    set_firebase_token_loading,
    set_firebase_token_data,
    set_firebase_token_error,
    set_firebase_token_clear_error,
    set_firebase_token_message,
    set_firebase_token_clear_message
} = registerFirebaseTokenSlice.actions;

export default {
    edit_profile: edit_profileSlice.reducer,
    all_category: get_all_categoriesSlice.reducer,
    slug_category: get_Post_by_category_Slice.reducer,
    get_featured: getFeaturedPostSlice.reducer,
    get_activities: getActivitiesSlice.reducer,
    submit_subscription: newsletterSubscriptionSlice.reducer,
    submit_contact_us: submitContactUsSlice.reducer,
    register_firebase_token: registerFirebaseTokenSlice.reducer
  
};
