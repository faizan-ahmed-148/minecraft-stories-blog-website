'use client';
import React, { useEffect } from 'react';
import './profile.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const { login_data } = useSelector((state) => state.login);
  const router = useRouter();

  const handleChangePassword = () => {
    router.push('/profile/change-password'); // Navigate to the Change Password page
  };

  const handleEditProfile = () => {
    router.push('/profile/edit'); // Navigate to the Edit Profile page
  };

  useEffect(()=>{
  
    if(!login_data?.token){
      router.push('/auth/login')

    }
      },[login_data])
  return (
    <div className="profile-page-container">
      <div className="profile-page-card">
        {/* Left Column: Avatar */}
        <div className="profile-left-column">
          <img
            src={login_data?.user.avatar}
            alt={login_data?.user?.username  ? login_data?.user?.username : login_data?.user?.name }
            className="profile-page-avatar"
          />
        </div>

        {/* Right Column: User Info */}
        <div className="profile-right-column">
          <p className="profile-field">
            <span className="label">Name:</span> {login_data?.user?.name || 'Not provided'}
          </p>
          <p className="profile-field">
            <span className="label">Username:</span> {login_data?.user?.username  ? login_data?.user?.username : login_data?.user?.name || 'Not available'}
          </p>
          <p className="profile-field">
            <span className="label">Email:</span> {login_data?.user.email || 'Not provided'}
          </p>
          <div className="profile-buttons">
            <button
              className="profile-edit-btn"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              className="profile-change-password-btn"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
