"use client";
import axios from "axios";
import {
  set_settings_data,
  set_settings_error,
  set_settings_loading,
} from "../Context/Settings";
import { getBaseUrl } from "@/config";
import {
  set_article_data,
  set_article_error,
  set_article_loading,
  set_article_message,
  set_comment_posts_data,
  set_comment_posts_error,
  set_comment_posts_loading,
  set_comment_posts_message,
  set_editor_posts_data,
  set_editor_posts_error,
  set_editor_posts_loading,
  set_recent_posts_data,
  set_recent_posts_error,
  set_recent_posts_loading,
  set_single_posts_data,
  set_single_posts_error,
  set_singlet_posts_loading,
  set_trending_posts_data,
  set_trending_posts_error,
  set_trending_posts_loading,
} from "../Context/Posts";

import {
  set_register_loading,
  set_register_data,
  set_register_error,
  set_register_message,
  set_login_loading,
  set_login_data,
  set_login_error,
  set_login_message,
  set_change_password_loading,
  set_change_password_success,
  set_change_password_error,
} from "../Context/Auth";
import {
  set_activities_data,
  set_activities_error,
  set_activities_loading,
  set_contact_us_data,
  set_contact_us_error,
  set_contact_us_loading,
  set_contact_us_message,
  set_edit_profile_data,
  set_edit_profile_error,
  set_edit_profile_loading,
  set_edit_profile_message,
  set_featured_post_data,
  set_featured_post_error,
  set_featured_post_loading,
  set_firebase_token_data,
  set_firebase_token_error,
  set_firebase_token_loading,
  set_firebase_token_message,
  set_get_Post_by_category_data,
  set_get_Post_by_category_error,
  set_get_Post_by_category_loading,
  set_get_all_categories_data,
  set_get_all_categories_error,
  set_get_all_categories_loading,
  set_newsletter_data,
  set_newsletter_error,
  set_newsletter_loading,
  set_newsletter_message,
} from "../Context/Article";
import {
  removeDataFromLocalStorage,
  setDataToLocalStorage,
} from "../Components/Helper/Helper";

const api_url = getBaseUrl();
export const handleRegister = async (
  dispatch,
  email,
  username,
  password,
  name
) => {
  dispatch(set_register_loading(true));
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("name", name);

  try {
    // Simulate API call for registration
    let response = await axios.post(`${api_url}/client/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "==>response");

    dispatch(set_register_data(response?.data?.token));
    dispatch(
      set_register_message(
        response?.data?.message
          ? response?.data?.message
          : "Registration successful!"
      )
    );
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_register_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Registration failed"
      )
    );
  } finally {
    dispatch(set_register_loading(false));
  }
};
export const handleLogin = async (
  dispatch,
  emailOrUsername,
  password,
  currentToken
) => {
  dispatch(set_login_loading(true));
  const formData = new FormData();
  if (emailOrUsername.includes("@")) {
    formData.append("email", emailOrUsername);
  } else {
    formData.append("username", emailOrUsername);
  }
  formData.append("password", password);

  if (currentToken) {
    formData.append("firebase_token", currentToken);
  }

  try {
    // Simulate API call for registration
    let response = await axios.post(`${api_url}/client/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "==>response");

    dispatch(set_login_data(response?.data));
    dispatch(
      set_login_message(
        response?.data?.message ? response?.data?.message : "Login successful!"
      )
    );
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_login_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Login failed"
      )
    );
  } finally {
    dispatch(set_login_loading(false));
  }
};

export const authMe = async (dispatch, currentToken) => {
  try {
    let response = await axios.get(`${api_url}/client/getUserInfo`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (response?.data?.user) {
      response.data.token = currentToken;
      setDataToLocalStorage("user_info", response?.data);
      dispatch(set_login_data(response?.data));
    } else {
      removeDataFromLocalStorage("user_info");
      dispatch(set_login_data(null))
    }
  } catch (error) {
    removeDataFromLocalStorage("user_info");
    dispatch(set_login_data(null))
    console.log(error, "==>response from server error getUserInfo");
  }
};
export const handleChangePass = async (
  dispatch,
  current_password,
  new_password,
  token
) => {
  dispatch(set_change_password_loading(true));
  const formData = new FormData();
  formData.append("current_password", current_password);
  formData.append("new_password", new_password);

  try {
    // Simulate API call for registration
    let response = await axios.post(
      `${api_url}/client/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response, "==>response");

    dispatch(
      set_change_password_success(
        response?.data?.message
          ? response?.data?.message
          : "Password changed successfully!"
      )
    );
    return response?.data;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_change_password_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Password changed failed"
      )
    );
  } finally {
    dispatch(set_change_password_loading(false));
  }
};

export const handleArticle = async (dispatch, formData, token) => {
  dispatch(set_article_loading(true));

  try {
    const response = await axios.post(
      `${api_url}/client/createArticle`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(set_article_data(response?.data)); // Store the article data in the state
    dispatch(
      set_article_message(
        response?.data?.message || "Article created successfully!"
      )
    );
    return response?.data; // Return the response to the component
  } catch (error) {
    dispatch(
      set_article_error(
        error?.response?.data?.message || "Something went wrong"
      )
    );
    return null; // Return
  } finally {
    dispatch(set_article_loading(false));
  }
};
export const fetch_user_Article = async (dispatch, token, page = 1) => {
  dispatch(set_article_loading(true));

  try {
    // Simulate API call for registration
    let response = await axios.get(
      `${api_url}/client/getPostByUser?page${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(set_article_data(response?.data?.posts?.data || []));
    return response?.data;
  } catch (error) {
    dispatch(
      set_article_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "something went wrong"
      )
    );
  } finally {
    dispatch(set_article_loading(false));
  }
};

export const PostComment = async (dispatch, id, body, token) => {
  dispatch(set_comment_posts_loading(true));
  const formData = new FormData();
  formData.append("body", body);

  try {
    // Simulate API call for registration
    let response = await axios.post(
      `${api_url}/client/comment/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response, "==>response_comment");

    dispatch(set_comment_posts_data(response?.data));
    // dispatch(set_comment_posts_message(response?.data?.message ? response?.data?.message : "Login successful!"));
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_comment_posts_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Login failed"
      )
    );
  } finally {
    dispatch(set_comment_posts_loading(false));
  }
};

export const getSettings = async (dispatch) => {
  try {
    dispatch(set_settings_loading(true));
    console.log("Calling API:", api_url);
    const response = await fetch(`${api_url}/client/getSiteSettings`, {});
    const data = response.json();
    dispatch(set_settings_loading(false));

    if (data?.data) {
      dispatch(set_settings_data(data?.data));
    }
    return data?.data;
  } catch (error) {
    dispatch(set_settings_loading(false));
    dispatch(set_settings_error("Something Went Wrong", error));
    console.error("Error in getSettings:", error);
  }
};

export const get_trending = async (dispatch, page = 1) => {
  try {
    dispatch(set_trending_posts_loading(true));
    console.log("Calling API:", api_url);
    const response = await axios.get(
      `${api_url}/client/posts/getHotTrendingPosts?page=${page}`
    );
    dispatch(set_trending_posts_loading(false));

    if (response?.data) {
      dispatch(set_trending_posts_data(response?.data));
    }
    return response?.data;
  } catch (error) {
    dispatch(set_trending_posts_loading(false));
    dispatch(set_trending_posts_error("Something Went Wrong", error));
    console.error("Error in getSettings:", error);
  }
};

export const get_editor = async (dispatch, page = 1) => {
  try {
    dispatch(set_editor_posts_loading(true));
    console.log("Calling API:", api_url);
    const response = await axios.get(
      `${api_url}/client/posts/editorspicked?page=${page}`
    );
    dispatch(set_editor_posts_loading(false));

    if (response?.data) {
      dispatch(set_editor_posts_data(response?.data));
    }
  } catch (error) {
    dispatch(set_editor_posts_loading(false));
    dispatch(set_editor_posts_error("Something Went Wrong", error));
    console.error("Error in getSettings:", error);
  }
};

export const get_recent = async (dispatch, page = 1) => {
  try {
    dispatch(set_recent_posts_loading(true));
    console.log("Calling API:", api_url);
    const response = await axios.get(
      `${api_url}/client/posts/getRecentPosts?page=${page}`
    );
    dispatch(set_recent_posts_loading(false));

    if (response?.data) {
      dispatch(set_recent_posts_data(response?.data));
    }
  } catch (error) {
    dispatch(set_recent_posts_loading(false));
    dispatch(set_recent_posts_error("Something Went Wrong", error));
    console.error("Error in getSettings:", error);
  }
};

export const get_single_post = async (dispatch, slug) => {
  try {
    dispatch(set_singlet_posts_loading(true));
    console.log("Calling API:", slug);
    const response = await axios.get(`${api_url}/client/post/${slug}`);
    dispatch(set_singlet_posts_loading(false));

    if (response?.data) {
      dispatch(set_single_posts_data(response?.data));
      return response?.data || null;
    }
  } catch (error) {
    dispatch(set_singlet_posts_loading(false));
    if (error.response?.status === 404) {
      console.error(`Post not found: ${slug}`);
      return error.response; // Explicitly return 404 if post is not found
    }
    dispatch(set_single_posts_error(error));
    console.error("Error in get_single_post:", error);
    return error;
  }
};

export const handleEditProfile = async (dispatch, image, token, name, username) => {
  dispatch(set_edit_profile_loading(true));
  const formData = new FormData();
  formData.append("avatar", image);
  formData.append("name", name);
  formData.append("username", username);

  try {
    // Simulate API call for registration
    let response = await axios.post(
      `${api_url}/client/updateProfile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response, "==>response");
    if(response?.data){
      dispatch(set_edit_profile_loading(false));
      dispatch(set_edit_profile_data(response?.data));
      console.log(response?.data, "response?.data)");
      dispatch(
        set_edit_profile_message(
          response?.data?.message
            ? response?.data?.message
            : "Edit Profile successful!"
        )
      );
      return response;
    }
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_edit_profile_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Edit Profile failed"
      )
    );
  } finally {
    dispatch(set_edit_profile_loading(false));
  }
};

export const get_all_category = async (dispatch) => {
  try {
    dispatch(set_get_all_categories_loading(true));
    const response = await axios.get(`${api_url}/client/getCategories`);
    dispatch(set_get_all_categories_loading(false));

    if (response?.data) {
      dispatch(set_get_all_categories_data(response?.data));
    }
    return response?.data || null;
  } catch (error) {
    dispatch(set_get_all_categories_loading(false));
    dispatch(set_get_all_categories_error("Something Went Wrong", error));
    console.error("Error in getSettings:", error);
    return null;
  }
};

export const get_category_slug = async (dispatch, pageNo, slug) => {
  try {
    dispatch(set_get_Post_by_category_loading(true));
    console.log("Calling API:", slug);
    const response = await axios.get(
      `${api_url}/client/posts/getPostsByCategory/${slug}?page=${pageNo}`
    );
    dispatch(set_get_Post_by_category_loading(false));

    if (response?.data) {
      dispatch(set_get_Post_by_category_data(response?.data));
    }
    return response?.data || null;
  } catch (error) {
    dispatch(set_get_Post_by_category_loading(false));
    dispatch(set_get_Post_by_category_error("Something Went Wrong", error));
    console.error("Error in getSettings:", error);
    return null;
  }
};

export const HandleGoogleAuth = async (access_token) => {
  const formData = new FormData();
  formData.append("accessToken", access_token);
  const response = await axios.post(`${api_url}/client/g-login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response?.data) {
    // toast.success("Login Successfull")
    console.log(response?.data, "googleData");

    setDataToLocalStorage("user_info", response?.data);
    console.log(response?.data, "googleData[0]");

    return true;
  }
};

export const submit_contact_form = async (
  dispatch,
  name,
  email,
  message,
  subject
) => {
  dispatch(set_contact_us_loading(true));
  const formData = new FormData();
  formData.append("email", email);
  formData.append("message", message);
  formData.append("name", name);
  formData.append("subject", subject);

  try {
    // Simulate API call for registration
    let response = await axios.post(`${api_url}/client/contact`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "==>response");

    dispatch(
      set_contact_us_message(
        response?.data?.message
          ? response?.data?.message
          : "Contact successful!"
      )
    );
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_contact_us_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Contact failed"
      )
    );
  } finally {
    dispatch(set_contact_us_loading(false));
  }
};

export const submit_subscription_form = async (dispatch, email) => {
  dispatch(set_newsletter_loading(true));

  try {
    // Simulate API call for registration
    let response = await axios.get(
      `${api_url}/client/subscribe?email=${email}`
    );
    console.log(response, "==>response");

    dispatch(
      set_newsletter_message(
        response?.data?.message
          ? response?.data?.message
          : "Registration successful!"
      )
    );
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_newsletter_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Registration failed"
      )
    );
  } finally {
    dispatch(set_newsletter_loading(false));
  }
};

export const register_firebase_token = async (
  dispatch,
  firebase_token,
  token
) => {
  dispatch(set_firebase_token_loading(true));
  const formData = new FormData();
  formData.append("firebase_token", firebase_token);

  try {
    // Simulate API call for registration
    let response = await axios.post(
      `${api_url}/client/registerFirebaseToken`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response, "==>response");

    dispatch(
      set_firebase_token_message(
        response?.data?.message
          ? response?.data?.message
          : "Registration successful!"
      )
    );
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_firebase_token_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Registration failed"
      )
    );
  } finally {
    dispatch(set_firebase_token_loading(false));
  }
};

export const get_featured_post = async (dispatch, page = 1) => {
  dispatch(set_featured_post_loading(true));

  try {
    // Simulate API call for registration
    let response = await axios.get(
      `${api_url}/client/posts/featuredposts?page=${page}`
    );
    console.log(response, "==>response");

    dispatch(set_featured_post_data(response?.data));
    return response;
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_featured_post_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Registration failed"
      )
    );
  } finally {
    dispatch(set_featured_post_loading(false));
  }
};

export const get_activities = async (dispatch, pagoNo) => {
  dispatch(set_activities_loading(true));

  try {
    // Simulate API call for registration
    let response = await axios.get(
      `${api_url}/client/getActivities?page=${pagoNo}`
    );
    console.log(response, "==>response");

    if (response?.data) {
      dispatch(set_activities_data(response.data));
      return response.data;
    }
  } catch (error) {
    console.log(error, "==>response");

    dispatch(
      set_activities_error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : " failed"
      )
    );
  } finally {
    dispatch(set_activities_loading(false));
  }
};
