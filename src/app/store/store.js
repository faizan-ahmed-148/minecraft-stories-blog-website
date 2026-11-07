import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import Settings from '../Context/Settings';

import PostsSlice from "../Context/Posts"
import Auth from '../Context/Auth';
import Article from '../Context/Article';
import { getApi } from '../Services/ChacheApis';

export const store = configureStore({
  reducer: {
    minecraft_settings: Settings,
    trending : PostsSlice.trending,
    editor: PostsSlice.editor,
    recent: PostsSlice.recent,
    single_post: PostsSlice.single_post,
    post_comment: PostsSlice.comment,
    change_pass: Auth.change_pass,
    register : Auth.register,
    login : Auth.login,
    article: PostsSlice.article,
    edit_profile: Article.edit_profile,
    all_category: Article.all_category,
    slug_category: Article.slug_category,
    get_featured: Article.get_featured,
    get_activities: Article.get_activities,
    submit_subscription: Article.submit_subscription,
    submit_contact_us: Article.submit_contact_us,
    register_firebase_token: Article.register_firebase_token,
    [getApi.reducerPath]: getApi.reducer, // ✅ Add RTK Query reducer

  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getApi.middleware), // ✅ Add RTK Query middleware
})

setupListeners(store.dispatch)