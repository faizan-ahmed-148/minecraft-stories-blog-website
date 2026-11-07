'use client'
import { set_settings_data } from '@/app/Context/Settings';
import { messaging } from '@/firebaseinit';
import { getToken } from 'firebase/messaging';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDataToLocalStorage } from '../Helper/Helper';
import { set_login_data } from '@/app/Context/Auth';
import { set_firebase_token_clear_error, set_firebase_token_clear_message } from '@/app/Context/Article';
import { authMe, register_firebase_token } from '@/app/Services/Apis';
import Script from 'next/script';

const Tracker = ({data, userData}) => {
  const dispatch = useDispatch()
  const [isActivate, setActivate] = useState(false);
  const {login_data} = useSelector(
    (state) => state.login
  );
  const {firebase_token_loading, firebase_token_message,firebase_token_error} = useSelector(state => state.register_firebase_token)
  useEffect(() => {
    const loadScripts = () => {
        setActivate(true)
    }

    const handleMouseMove = () => {
      loadScripts();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
    };
  }, [data?.settings]);
  const setThemeCSS = (theme) => {
    const root = document.querySelector(":root")
    root.style.setProperty('--primary_color', theme.primary_color ? theme.primary_color : "#1d1b1c")
    root.style.setProperty('--secondary_color', theme.secondary_color ? theme.secondary_color : "#0ff")
    root.style.setProperty('--featured_box_color', theme.featured_box_color ? theme.featured_box_color : "#4444ff")
    root.style.setProperty('--hot_trending_post_box_color', theme.hot_trending_post_box_color ? theme.hot_trending_post_box_color  : "#f2333f")
    root.style.setProperty('--editor_box_color', theme.editor_box_color ? theme.editor_box_color : "#d4b848")
    root.style.setProperty('--twitch_box_color', theme.twitch_box_color ? theme.twitch_box_color : "#5a3ea0")
    root.style.setProperty('--recent_posts_box', theme.recent_posts_box ? theme.recent_posts_box : "#0d8de8")
    root.style.setProperty('--activity_box_color', theme.activity_box_color ? theme.activity_box_color : "#995e37")
    root.style.setProperty('--text_color_light', theme.text_color_light ? theme.text_color_light : "#ffffff")
    root.style.setProperty('--text_color_dark', theme.text_color_dark ?theme.text_color_dark : "#000000")
    root.style.setProperty('--container_color', theme.container_color ? theme.container_color : "#171717")
    root.style.setProperty('--background_color', theme.background_color ? theme.background_color : "black")
    root.style.setProperty('--box_shadow_color', theme.box_shadow_color ? theme.box_shadow_color : "rgba(0, 0, 0, 0.4)")
    root.style.setProperty('--text_color_muted', theme.text_color_muted ? theme.text_color_muted :"#333")
    root.style.setProperty('--text_color_muted_light', theme.text_color_muted_light ? theme.text_color_muted_light : "#555")
    root.style.setProperty('--background_button_color', theme.background_button_color ? theme.background_button_color : "#00ff00")
    root.style.setProperty('--background_button_hover_color', theme.background_button_hover_color ? theme.background_button_hover_color : "#00cc00")
    root.style.setProperty('--form_input_bg', theme.form_input_bg ? theme.form_input_bg : "#333")
    root.style.setProperty('--header_background', theme.header_background ? theme.header_background : "#1c1c1c")
    root.style.setProperty('--card_background', theme.card_background ? theme.card_background : "#1b1b1b")
    root.style.setProperty('--list_views_text_color', theme.list_views_text_color ? theme.list_views_text_color : "#e9ff27")
    root.style.setProperty('--list_border_top_color', theme.list_border_top_color ? theme.list_border_top_color : "#00ffae")
    root.style.setProperty('--list_loader_color', theme.list_loader_color ? theme.list_loader_color : "rgba(0, 255, 174, 0.3)")
  
  }
  useEffect(()=>{
    if (data?.settings) {
      console.log(data,'data?.settings');
      setThemeCSS(data?.options)
      dispatch(set_settings_data(data))
    }
   
  },[data?.settings])

  useEffect(()=>{
if (userData) {
  setDataToLocalStorage("user_info", JSON.parse(userData));
  dispatch(set_login_data(JSON.parse(userData)))
}
  },[userData])
  
  const fcm = async () => {
    // Request notification permission from the user
    if (window?.Notification) {
      const permission = await window.Notification.requestPermission();

      // Only attempt to get the token if permission is granted
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // Ensure messaging is initialized
        if (messaging) {
          let currentToken
          try {
            // Get the token (this will work after service worker is registered)
            currentToken = await getToken(messaging, {
              vapidKey:
                "BB8lpx2bQAmgs3n4oZuF9rCtW-ZI_h0H734dakx5HJ7R8lmyvHP0QkiRfokWzWTf2GRrHmMQSazfcBHyLvjhFY8",
            });

            if (currentToken) {
              console.log("FCM Token:", currentToken);
              if (login_data?.token && currentToken) {
                
                register_firebase_token(dispatch, currentToken,login_data?.token )
                }
              // Send the token to your server or use it as needed
            } else {
              console.log("No registration token available.");
            }
          } catch (error) {
            console.warn("Error getting FCM token:", error);
          }
        }
      }
    }
  };
  useEffect(() => {
    if(login_data?.token){
      authMe(dispatch, login_data?.token)
      fcm();
    }
  }, []);


  // useEffect(() => {
  //   if (firebase_token_message) {
  //     toast.success(firebase_token_message);
  //     dispatch(set_firebase_token_clear_message());
  //   }
  //   if (firebase_token_error) {
  //     toast.error(firebase_token_error);
  //     dispatch(set_firebase_token_clear_error());
  //   }
  // }, [dispatch, firebase_token_error, firebase_token_message]);
  return (
    <>
  
     {data?.settings?.ga4_merasurement_id ?
     <>
        <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${data?.settings?.ga4_merasurement_id}`}
    />
    <Script
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config','${data?.settings?.ga4_merasurement_id}');
    `,
      }}
    />
    </>: <></>}

  </>
  )
}

export default Tracker
