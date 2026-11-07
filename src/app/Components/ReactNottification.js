'use client'
import React, { useEffect } from "react";
import {  onMessage } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import { messaging } from "@/firebaseinit"; // Ensure messaging is correctly initialized
import "react-toastify/dist/ReactToastify.css";
import useFirebaseNotifications from "../hook/useFirebaseNotifications";
const ReactNotificationComponent = ({ children }) => {
  // Call the Firebase notifications setup hook to register the service worker
  useFirebaseNotifications();
  // Custom function to show toast with both title and body
  function showNotification(notification) {
    toast.success(
      <div style={{
        lineHeight: "1.5",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',  // Align text to the left
      }}>
        <strong style={{
          fontSize: "14px",
          color: "#333",
          fontWeight: "bold"
        }}>
          {notification.title} {/* Title Style */}
        </strong>
        <p style={{
          fontSize: "14px",
          color: "#555",
          marginTop: "2px",  // Margin between title and body
          marginBottom: "0", // Remove bottom margin to make it compact
        }}>
          {notification.body}  {/* Body Style */}
        </p>
      </div>,
      {
        position: "top-center",
        closeOnClick: true,
        autoClose: 3000,
        style: {
          color: "#fff",               // White text color for better contrast
          borderRadius: "12px",         // Slightly rounded corners
          fontFamily: "'Roboto', sans-serif", // Font family for consistency
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
          padding: "16px",              // Padding inside the toast
          minWidth: "380px",             // Maximum width for better responsiveness
        },
        className: "custom-toast",      // Optional for further customization via CSS
      }
    );
  }
  useEffect(() => {
    if (messaging) {


      onMessage(messaging, (payload) => {
        console.log('=================> Received message payload:', payload);
        showNotification(payload.notification);  // Show the toast notification with the message
      })
    };

  }, [messaging]);




  return <> <ToastContainer

    position="top-center"
    autoClose={3000}
  />
    {children}</>;
};

export default ReactNotificationComponent;
