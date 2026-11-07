'use client'
import React, { useEffect, useState, useTransition } from 'react';
import './changePass.scss';

import { clear_change_password_error, clear_change_password_message } from '../../Context/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangePass } from '../../Services/Apis';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ChnagePass = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({ current_password: '', new_password: '' });
  const [isPending, startTransition] = useTransition();
  const { change_password_loading, change_password_error, change_password_message } = useSelector(state => state.change_pass);
  const { login_data } = useSelector((state) => state.login);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await handleChangePass(
        dispatch,
        formData.current_password,
        formData.new_password,
        login_data?.token
      );

      setTimeout(() => {
        if (response) {
          router.push('/profile');
        }
      }, 1000);
    });

    setFormData({ current_password: '', new_password: '' });
  };

  useEffect(() => {
    if (change_password_message) {
      toast.success(change_password_message);
      dispatch(clear_change_password_message());
    }
    if (change_password_error) {
      toast.error(change_password_error);
      dispatch(clear_change_password_error());
    }
  }, [dispatch, change_password_error, change_password_message]);

  useEffect(()=>{
    if(!login_data?.token){
      router.push('/auth/login')

    }
      },[login_data])
  return (
    <div className="change-pass-container">
      {/* <div className="change-pass-left-section">
        <h1 className="change-pass-heading">Change Your Password</h1>
      </div>
      <div className="change-pass-divider-line">
        <Image src={white_line} alt="Divider" priority />
      </div> */}
      <div className="change-pass-right-section">
        <h2 className="change-pass-right-heading">CHANGE PASSWORD</h2>
        <form onSubmit={handleSubmit}>
          <div className="change-pass-input-group">
            <label>Current Password</label>
            <input
              type="password"
              name="current_password"
              required
              placeholder="Enter your current password"
              value={formData.current_password}
              onChange={handleChange}
            />
          </div>
          <div className="change-pass-input-group">
            <label>New Password</label>
            <input
              type="password"
              name="new_password"
              required
              placeholder="Enter your new password"
              value={formData.new_password}
              onChange={handleChange}
            />
          </div>
          <div className="change-pass-con">
            <div className="change-pass-terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I have read and agree to all the terms and conditions</label>
            </div>
            <button className="change-pass-btn" type="submit" disabled={isPending || change_password_loading}>
              {isPending ? 'Processing...' : 'CHANGE PASSWORD'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChnagePass;
