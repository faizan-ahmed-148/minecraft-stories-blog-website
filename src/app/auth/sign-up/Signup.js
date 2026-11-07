'use client';
import React, { useEffect, useState, useTransition } from 'react';
import './signup.scss';
import Image from 'next/image';
import white_line from '../../../../public/assets/images/LineWhite.svg';
import { useSelector, useDispatch } from 'react-redux';
import {toast } from 'react-toastify';
import Link from 'next/link';
import { handleRegister } from '../../Services/Apis';
import { clear_register_error, clear_register_message } from '../../Context/Auth';
import { usePathname, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
 const {register_data,register_loading, register_error, register_message } = useSelector(state => state.register)
 
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    startTransition(async () => {
      let response =  await handleRegister(
        dispatch,
        formData.email,
        formData.username,
        formData.password,
        formData.name
      );
      
    if (response?.data?.token) {
      setFormData({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        username: ''
      });
      router.push('/auth/login')
    }
    });


  };
useEffect(()=>{
if(register_message){
  toast.success(register_message)
  dispatch(clear_register_message())
}
if (register_error) {
  toast.error(register_error)
  dispatch(clear_register_error())
}
},[ dispatch, register_error, register_message])

  return (<>

    <div className="signup-container">

      <div className="signup-left-section">
        <div className="signup-heading">EVERY BLOCK HAS A STORY</div>
        <div className="signup-para">Join Minecraft Stories to share yours, build new adventures</div>
        <div className="signup-para2"> and leave a legacy one block at a time.</div>
        </div>

      <div className="signup-divider-line">
        <Image src={white_line} alt="divider" priority />
      </div>

      <div className="signup-right-section">
        <div className="signup-right-heading">SIGN UP</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group-section">
            <div className="signup-input-group-1">
              <label>User Name</label>
              <input
                type="text"
                name="username"
                required
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="signup-input-group-1">
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder=" Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="signup-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="signup-input-group">
            <label>Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Re-enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="signup-con">
            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I have read and agree to all the terms and conditions</label>
            </div>
            <button className="signup-btn  " type="submit" disabled={isPending || register_loading}>
              {isPending ? 'Please wait...' : 'SIGN UP'}
            </button>

            <div className="google-sign-in mt-2">
              <button className="google-btn"
               type="button" 
               onClick={(e) => {
                e.preventDefault(), signIn('google')}}
              >
                <img src="https://w7.pngwing.com/pngs/937/156/png-transparent-google-logo-google-search-google-account-redes-search-engine-optimization-text-service-thumbnail.png" alt="Google Logo" className="google-logo" />
                Sign in with Google
              </button>
            </div>

            <p className="signup-link">
              Already have an account? <Link href="/auth/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default SignupPage;
