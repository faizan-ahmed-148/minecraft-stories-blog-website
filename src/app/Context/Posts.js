import { createSlice } from "@reduxjs/toolkit";

const PostsSlice = createSlice({
    name: "Posts",
    initialState: {
        trending_posts_data: null,
        trending_posts_loading: false,
        trending_posts_error: null,
        trending_posts_clear_error: null,
    },
    reducers: {
        set_trending_posts_loading: (state, action) => {
            state.trending_posts_loading = action.payload;
        },
        set_trending_posts_data: (state, action) => {
            state.trending_posts_data = action.payload;
        },
        set_trending_posts_error: (state, action) => {
            state.trending_posts_error = action.payload;
        },
        set_trending_posts_clear_error: (state, action) => {
            state.trending_posts_error = null;
        },
    },
});

// Editor Posts Slice
const EditorPostsSlice = createSlice({
    name: "EditorPosts",
    initialState: {
        editor_posts_data: null,
        editor_posts_loading: false,
        editor_posts_error: null,
        editor_posts_clear_error: null,
    },
    reducers: {
        set_editor_posts_loading: (state, action) => {
            state.editor_posts_loading = action.payload;
        },
        set_editor_posts_data: (state, action) => {
            state.editor_posts_data = action.payload;
        },
        set_editor_posts_error: (state, action) => {
            state.editor_posts_error = action.payload;
        },
        set_editor_posts_clear_error: (state, action) => {
            state.editor_posts_error = null;
        },
    },
});

// Recent Posts Slice
const RecentPostsSlice = createSlice({
    name: "RecentPosts",
    initialState: {
        recent_posts_data: null,
        recent_posts_loading: false,
        recent_posts_error: null,
        recent_posts_clear_error: null,
    },
    reducers: {
        set_recent_posts_loading: (state, action) => {
            state.recent_posts_loading = action.payload;
        },
        set_recent_posts_data: (state, action) => {
            state.recent_posts_data = action.payload;
        },
        set_recent_posts_error: (state, action) => {
            state.recent_posts_error = action.payload;
        },
        set_recent_posts_clear_error: (state, action) => {
            state.recent_posts_error = null;
        },
    },
});


const SinglePostsSlice = createSlice({
    name: "SinglePosts",
    initialState: {
        single_posts_data: null,
        single_posts_error: null,
        single_posts_loading: false,
        single_posts_clear_error: null,
    },
    reducers: {
        set_singlet_posts_loading: (state, action) => {
            state.single_posts_loading = action.payload;
        },
        set_single_posts_data: (state, action) => {
            state.single_posts_data = action.payload;
        },
        set_single_posts_error: (state, action) => {
            state.single_posts_error = action.payload;
        },
        set_single_posts_clear_error: (state, action) => {
            state.single_posts_error = null;
        },
    },
});

const PostCommentSlice = createSlice({
    name: "comment",
    initialState: {
        comment_data: null,
        comment_posts_loading: false,
        comment_posts_clear_error: null,
        comment_posts_error: null,
        comment_posts_clear_message: null,
        comment_posts_message: null,
    },
    reducers: {
        set_comment_posts_loading: (state, action) => {
            state.comment_posts_loading = action.payload;
        },
        set_comment_posts_data: (state, action) => {
            state.comment_data = action.payload;
        },
        set_comment_posts_error: (state, action) => {
            state.comment_posts_error = action.payload;
        },
        set_comment_posts_clear_error: (state, action) => {
            state.comment_posts_error =null;
        },
        set_comment_posts_message: (state, action) => {
            state.comment_posts_message = action.payload;
        },
        set_comment_posts_clear_message: (state, action) => {
            state.comment_posts_message = null;
        },
    },
});

const ArticleSlice = createSlice({
    name: 'article',
    initialState: {
        article_data: null,               // Stores the article data (or list of articles)
        article_loading: false,           // Loading state when fetching or creating articles
        article_error: null,              // Error state for articles
        article_message: null,            // Message related to article creation or fetching
        article_clear_error: null,        // State to trigger clearing of error messages
        article_clear_message: null,      // State to trigger clearing of success messages
    },
    reducers: {
        // Sets the loading state for articles (either creating or fetching)
        set_article_loading: (state, action) => {
            state.article_loading = action.payload;
        },

        // Sets the article data (for fetched or created articles)
        set_article_data: (state, action) => {
            state.article_data = action.payload;
        },

        // Sets the error for article fetch or creation
        set_article_error: (state, action) => {
            state.article_error = action.payload;
        },

        // Clears the error state
        set_article_clear_error: (state, action) => {
            state.article_error =null;
        },

        // Sets the message (e.g., for successful creation or update)
        set_article_message: (state, action) => {
            state.article_message = action.payload;
        },

        // Clears the message state
        set_article_clear_message: (state, action) => {
            state.article_message = null;
        },
    },
});

export const {
    set_article_loading,
    set_article_data,
    set_article_error,
    set_article_clear_error,
    set_article_message,
    set_article_clear_message
} = ArticleSlice.actions
export const {
    set_comment_posts_data,
    set_comment_posts_error,
    set_comment_posts_loading,
    set_comment_posts_clear_error,
    set_comment_posts_message,
    set_comment_posts_clear_message
} = PostCommentSlice.actions;


export const {
    set_trending_posts_data,
    set_trending_posts_error,
    set_trending_posts_loading,
    set_trending_posts_clear_error,
} = PostsSlice.actions;

export const {
    set_editor_posts_data,
    set_editor_posts_error,
    set_editor_posts_loading,
    set_editor_posts_clear_error,
} = EditorPostsSlice.actions;

export const {
    set_recent_posts_data,
    set_recent_posts_error,
    set_recent_posts_loading,
    set_recent_posts_clear_error,
} = RecentPostsSlice.actions;
export const {
    set_singlet_posts_loading,
    set_single_posts_data,
    set_single_posts_error,
    set_single_posts_clear_error,
} = SinglePostsSlice.actions;

export default {
    trending: PostsSlice.reducer,
    editor: EditorPostsSlice.reducer,
    recent: RecentPostsSlice.reducer,
    single_post: SinglePostsSlice.reducer,
    comment: PostCommentSlice.reducer,
    article: ArticleSlice.reducer
};
