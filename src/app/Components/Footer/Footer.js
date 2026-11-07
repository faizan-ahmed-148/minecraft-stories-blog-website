'use client'
import React, { useEffect, useState, useTransition } from 'react';
import './Footer.scss';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai"
import logo from '../../../../public/assets/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { set_newsletter_clear_error, set_newsletter_clear_message } from '@/app/Context/Article';
import { toast } from 'react-toastify';
import { submit_subscription_form } from '@/app/Services/Apis';

const Footer = () => {
  const dispatch = useDispatch()
  const { settings_data } = useSelector(
    (state) => state.minecraft_settings
  );
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const { newsletter_loading, newsletter_error, newsletter_message } = useSelector(state => state.submit_subscription)
  const [clientLoaded, setClientLoaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();


    startTransition(async () => {
      let response = await submit_subscription_form(dispatch, email)
      if (response?.data?.message) {
        setEmail("")
      }

    });
  };
  useEffect(() => {
    if (newsletter_message) {
      toast.success(newsletter_message);
      dispatch(set_newsletter_clear_message());
    }
    if (newsletter_error) {
      toast.error(newsletter_error);
      dispatch(set_newsletter_clear_error());
    }
  }, [dispatch, newsletter_error, newsletter_message]);
  useEffect(() => {
    setClientLoaded(true);
  }, []);
  return (
    clientLoaded && (
      <footer className="minecraft-footer">
        <div className="newsletter-section">
          <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <p>
              Craft your way to success! Subscribe for tips, tricks, and the latest
              updates delivered to your inbox.
            </p>
            <div>
              <input
                type="email"
                placeholder="Your Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button disabled={isPending || newsletter_loading} type="submit">
                {isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
        </div>

        <div className="footer-content">
          <div className="logo-social">
            <Link href='/' className="logo">
              <Image
                width={500}
                height={500} src={settings_data?.settings?.logo} alt="Minecraft Stories Logo" />
            </Link>
            <div className="social-links">
              {settings_data?.settings?.url_fb ? <a href={settings_data?.settings?.url_fb} target='_blank'><FaFacebook size="1.6rem" /></a> : null}
              {settings_data?.settings?.url_twitter ? <a href={settings_data?.settings?.url_twitter} target='_blank'><AiFillTwitterCircle size="1.8rem" /></a> : null}
              {settings_data?.settings?.url_insta ? <a href={settings_data?.settings?.url_insta} target='_blank'><FaSquareInstagram size="1.6rem" /></a> : null}
              {settings_data?.settings?.youtube_url ? <a href={settings_data?.settings?.youtube_url} target='_blank'><FaYoutube size="1.8rem" /></a> : null}
            </div>
          </div>

          <div className="about-us">
            <h3>ABOUT US</h3>
            <p>
              {settings_data?.settings?.about}
            </p>
          </div>
          <div className="divider"></div> {/* Vertical Divider */}
          <div className="quick-links">
            <h3>QUICK LINKS</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/privacyPolicy">Privacy Policy</Link></li>
              <li><Link href="/terms&conditions">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            {settings_data?.settings?.copy_rights}
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
