"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import "./new-article.scss";
import publish_btn from "../../../../public/assets/buttonsfinal/publish.webp";
import cancel_btn from "../../../../public/assets/buttonsfinal/cancel.png";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import defaultImage from "../../../../public/assets/images/default.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleArticle } from "../../Services/Apis";
import {
  set_article_clear_error,
  set_article_clear_message,
} from "../../Context/Posts";
import axios from "axios";
import { getBaseUrl } from "@/config";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "reactstrap";
const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => <p>Loading Text Editor...</p>,
});
const NewArticle = () => {
  const router = useRouter();
  const quillRef = useRef(null);
  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]); // Selected tags
  const [tagQuery, setTagQuery] = useState(""); // Search query for tag suggestions
  const [categories, setCategories] = useState([]); // Store categories from API
  const [allTags, setAllTags] = useState([]); // Store tags from API
  const api_url = getBaseUrl();
  const [isEditorsPick, setIsEditorsPick] = useState(false);
  const [image, setImage] = useState(null);
  const [clientLoaded, setClientLoaded] = useState(false);

  // Get logged in user data
  const { login_data } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const { article_loading, article_error, article_message } = useSelector(
    (state) => state.article
  );

  // Get the full page URL
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  // Fetch categories and tags on component mount
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const token = login_data?.token; // Assuming token is stored in login_data

        // Fetch categories
        const categoriesResponse = await axios.get(
          `${api_url}/client/getPublicCategories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch tags
        const tagsResponse = await axios.get(`${api_url}/client/getTags`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(categoriesResponse.data.categories);
        setAllTags(tagsResponse.data.tags);
      } catch (error) {
        toast.error("Error fetching categories or tags");
      }
    };
    if (login_data?.token) {
      fetchCategoriesAndTags();
    } else {
      router.push("/auth/login");
    }
  }, [login_data?.token]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload an image of type jpeg, png, or jpg.");
        return;
      }

      // Check file size (example: 2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should not exceed 2MB.");
        return;
      }

      setImage(file); // Set the image file directly (not base64)
    }
  };

  // Handle form submission (create article)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    formData.append("category_id", category);
    formData.append("slug", title.toLowerCase().replace(/ /g, "-"));
    formData.append("status", 1); // Assuming 1 means 'published'
    formData.append("tags", tags.join(",")); // gs as an array
    formData.append("is_editors_pick", isEditorsPick ? 1 : 0); // Convert to 1 or 0
    if (image) formData.append("image", image); // Append the image file

    // Dispatch create article action (assumed to be implemented in your redux slice)
    const response = await handleArticle(dispatch, formData, login_data?.token); // Pass form data to handleArticle API
    if (response?.message === "Post successfully.") {
      setTimeout(() => {
        router.push("your-article");
      }, 2000);
    }
  };

  useEffect(() => {
    if (article_message) {
      toast.success(article_message);
      dispatch(set_article_clear_message());
    }
    if (article_error) {
      toast.error(article_error);
      dispatch(set_article_clear_error());
    }
  }, [dispatch, article_error, article_message]);

  const handleTagInputChange = (e) => {
    setTagQuery(e.target.value); // Update the search query for tags
  };

  const handleTagAdd = (tag) => {
    if (!tags.includes(tag.id)) {
      // Check if the tag is not already added
      setTags([...tags, tag.id]); // Add tag ID to the selected list
      setTagQuery(""); // Reset the search query
    }
  };

  // Handle removing a tag
  const handleTagRemove = (tagId) => {
    setTags(tags.filter((t) => t !== tagId)); // Remove tag ID from selected list
  };

  // Filter tags based on the query
  const filteredTags = allTags.filter((tag) =>
    tag.name.toLowerCase().includes(tagQuery.toLowerCase())
  );


  useEffect(() => {
    setClientLoaded(true);
  }, []);
 
  return (
    <>
      {clientLoaded && (
        <div className="new-article-container">
          <div className="new-article-header">
            <h1>Create Article</h1>
            <div className="hori_line">
              <Image
                className="horizon-line"
                src={horizon_line}
                alt="horizon line"
              />
            </div>
          </div>

          <form className="new-article-form" onSubmit={handleSubmit}>
            {/* Display user avatar and username */}
            <div className="new-article-username">
              {login_data?.user?.avatar && (
                <span className="new-article-avatar">
                  <Image src={defaultImage} alt="User Avatar" />
                </span>
              )}
              <span className="new-article-username-text">
                {login_data?.user?.username
                  ? login_data?.user?.username
                  : login_data?.user?.name}
              </span>
            </div>

            {/* Title input */}
            <input
              type="text"
              className="new-article-title"
              placeholder="Create your title..."
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Rich Text Editor for description */}
            <div className="new-article-description">
            <QuillEditor description={description} handleDescriptionChange={handleDescriptionChange}/>
            </div>

            {/* Image Upload */}
            <div className="new-article-image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="new-article-image-input"
              />
            </div>

            {/* Tags Input */}
            <div className="new-article-tags-input">
              <div className="tag-input-field">
                <input
                  type="text"
                  value={tagQuery}
                  onChange={handleTagInputChange}
                  placeholder="Start typing to search tags..."
                  className="tag-input"
                  required
                  disabled={tags?.length >= 1}
                />
                <div className="tag-suggestions">
                  {filteredTags.length > 0 && tagQuery && (
                    <ul>
                      {filteredTags.map((tag) => (
                        <li key={tag.id} onClick={() => handleTagAdd(tag)}>
                          {tag.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Display selected tags as chips */}
              <div className="selected-tags">
                {tags.map((tagId, index) => {
                  const tag = allTags.find((t) => t.id === tagId); // Find the tag by ID
                  return tag ? (
                    <div key={index} className="tag-chip">
                      {tag.name} {/* Display tag name */}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tagId)}
                      >
                        X
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Article Options */}
            <div className="new-article-options">
              <select
                className="new-article-category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Meta Information */}
            <div className="new-article-meta">
              <input
                type="text"
                className="new-article-meta-title"
                placeholder="Meta Title"
                value={metaTitle}
                required
                onChange={(e) => setMetaTitle(e.target.value)}
              />
              <input
                type="text"
                className="new-article-meta-description"
                placeholder="Meta Description"
                value={metaDescription}
                required
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            {/* Editors Pick */}
            {/* <div className="new-article-editors-pick">
          <label>
            <input
              type="checkbox"
              checked={isEditorsPick}
              
              onChange={(e) => setIsEditorsPick(e.target.checked)}
            />
            Editors Pick
          </label>
        </div> */}

            {/* Action Buttons */}
            <div className="new-article-actions">
              <button className="new-article-btn-cancel">
                <Image src={cancel_btn} alt="Cancel" />
              </button>
              <button
                disabled={article_loading}
                className="new-article-btn-publish"
                type="submit"
              >
                {article_loading ? (
                  <Spinner color="white" />
                ) : (
                  <>
                    <Image src={publish_btn} alt="Publish" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewArticle;
