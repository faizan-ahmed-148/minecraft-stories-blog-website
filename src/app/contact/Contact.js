'use client'
import React, { useEffect, useState, useTransition } from 'react';
import './contact.scss';
import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaSquareInstagram } from "react-icons/fa6";
import Image from 'next/image';
import white_line from '../../../public/assets/images/LineWhite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { set_contact_us_clear_error, set_contact_us_clear_message } from '../Context/Article';
import { submit_contact_form } from '../Services/Apis';
import { toast } from 'react-toastify';

const Contact = () => {
  const dispatch = useDispatch()

  const {contact_us_loading, contact_us_error, contact_us_message}= useSelector(state => state.submit_contact_us)
    const { settings_data} = useSelector(
    (state) => state.minecraft_settings
  );
  const [useClient, setUseclient]= useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: '',
    message: '',
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      let response = await submit_contact_form(dispatch, formData.name, formData.email,formData.message, formData.subject)
      if (response?.data?.message) {
        setFormData({
          email: '',
          name: '',
          subject: '',
          message: '',
        });
      }
     
    });
  };

  useEffect(() => {
    if (contact_us_message) {
      toast.success(contact_us_message);
      dispatch(set_contact_us_clear_error());
    }
    if (contact_us_error) {
      toast.error(contact_us_error);
      dispatch(set_contact_us_clear_message());
    }
  }, [dispatch, contact_us_error, contact_us_message]);
  useEffect(()=>{
    setUseclient(true)
  },[])
  return (
    <>
{useClient && (
    <div className="contact-container">
      <div className="contact-left-section">
        <div className="contact-heading">CONTACT US</div>
        <div className="contact-child-heading">Minecraft Stories</div>
        <div className="social-icons">
          {settings_data?.settings?.url_insta ? <div className="icon">
          <a href={settings_data?.settings?.url_insta} target="_blank"><FaSquareInstagram size="1.6rem"/></a>
            <p>Instagram</p>
          </div> : null}
          {settings_data?.settings?.url_twitter ?<div className="icon">
          <a href={settings_data?.settings?.url_twitter} target="_blank"><AiFillTwitterCircle size="1.8rem"/></a>
            <p>Twitter</p>
          </div>: null}
          {settings_data?.settings?.youtube_url ?<div className="icon">
          <a href={settings_data?.settings?.youtube_url} target="_blank"><FaYoutube size="1.8rem"/></a>
            <p>YouTube</p>
          </div>: null}
          {settings_data?.settings?.url_fb ?<div className="icon">
          <a href={settings_data?.settings?.url_fb} target="_blank"><FaFacebook size="1.6rem"/></a>
            <p>Facebook</p>
          </div>: null}
        </div>
      </div>
      
      <div className="contact-divider-line">
        <Image  alt="white_line" src={white_line} priority />
      </div>
      
      <div className="contact-right-section">
        <div className="contact-right-heading">Get in Touch</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group-section">
          <div className="contact-input-group-1">
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="contact-input-group-1">
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
          
          </div>
          <div className="contact-input-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="contact-text-group">
            <label>Message</label>
            <textarea
              name="message"
              required
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="contact-btn-form">
            <button type="submit" disabled={isPending || contact_us_loading}>
              {isPending ? 'Submitting...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
    </div>)}
    </>
  );
};

export default Contact;
