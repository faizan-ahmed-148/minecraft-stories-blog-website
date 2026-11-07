"use client";
import React, { useEffect, useState, useTransition } from "react";
import "./editProfile.scss";

import { useDispatch, useSelector } from "react-redux";
import { authMe, handleEditProfile } from "../../Services/Apis";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  set_edit_profile_clear_error,
  set_edit_profile_clear_message,
} from "@/app/Context/Article";
import {
  getDataFromLocalStorage,
  getParsedDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/app/Components/Helper/Helper";

const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { edit_profile_loading, edit_profile_error, edit_profile_message } =
    useSelector((state) => state.edit_profile);
  const { login_data } = useSelector((state) => state.login);
  const [formData, setFormData] = useState({ image: login_data?.user?.avatar, username: login_data?.user?.username, name: login_data?.user?.name, email: login_data?.user?.email });
  const [image, setImage] = useState(null); // Use the initial avatar URL

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle avatar file input change
  const handleFileChange = (e) => {
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
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl, // Store the actual file for submission
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await handleEditProfile(
        dispatch,
        image,
        login_data?.token,
        formData?.name,
        formData?.username,
      ); 
      if (response?.data?.user) {
        if(login_data?.token){
         authMe(dispatch, login_data?.token);
        }
      }
    });

  };
  useEffect(() => {
    if (edit_profile_message) {
      toast.success(edit_profile_message);
      dispatch(set_edit_profile_clear_message());
    }
    if (edit_profile_error) {
      toast.error(edit_profile_error);
      dispatch(set_edit_profile_clear_error());
    }
  }, [dispatch, edit_profile_error, edit_profile_message]);

  useEffect(() => {
    if (!login_data?.token) {
      router.push("/auth/login");
    }
  }, [login_data]);
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-right-section">
        <h2 className="edit-profile-right-heading">EDIT PROFILE</h2>
        <form onSubmit={handleSubmit}>
          {/* Avatar Upload Section */}
          <div className="edit-profile-avatar-group">
            {formData?.image && (
              <div className="avatar-preview">
                <img src={formData?.image} alt="Avatar Preview" />
              </div>
            )}
            <label>Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Name Input */}
          <div className="edit-profile-input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              value={formData.name }
              onChange={handleChange}
            />
          </div>

          {/* Username Input */}
          <div className="edit-profile-input-group">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              required
              placeholder="Enter your user name"
              value={formData.username }
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div className="edit-profile-input-group">
            <label>New Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your new email"
              disabled
              value={formData.email }
              onChange={handleChange}
            />
          </div>

          {/* Terms Checkbox and Submit */}
          <div className="edit-profile-con">
            <div className="edit-profile-terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I have read and agree to all the terms and conditions
              </label>
            </div>
            <button
              className="edit-profile-btn"
              type="submit"
              disabled={isPending || edit_profile_loading}
            >
              {isPending ? "Processing..." : "EDIT PROFILE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
