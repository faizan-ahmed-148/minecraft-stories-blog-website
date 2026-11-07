'use client';
import React,{useState,useRef,useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'reactstrap';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTiktok,
    faTwitter,
    faYoutube,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import { FaShare } from 'react-icons/fa';

const ShareDropdown = ({merchantId}) => {
    const [open,setOpen]=useState(false);

    const parentRef = useRef(null);

    const handleClickOutside = (event) => {
        if (parentRef.current && !parentRef.current.contains(event.relatedTarget)) {
          setOpen(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location);
        setOpen(false);
        toast.success("Link Copied", {position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: false,
        theme: "colored",
        className: "cart-success-toastify"});
    }

    const handleFbShare = () => {
      let url = window.location.href;
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      window.open(facebookUrl, '_blank');
    };

    const handleTwitterShare = () => {
      let url = window.location;
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Checkout this item")}`;
      window.open(twitterUrl, '_blank');
    };
    const handleInstagramShare = () => {
      const url = window.location.href;
      const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
      window.open(instagramShareUrl, '_blank');
    };
    
    

    const handleLinkedinShare = () => {
      let url = window.location;
      const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
      window.open(linkedInUrl, '_blank');
    };
    console.log("check id==>",merchantId)
  return (
    <div className={`share-container action-item1 ${open ? 'open' : ''}`} ref={parentRef} onBlur={handleClickOutside} tabIndex={0}>
    <div className='m-auto share-icon' onClick={() => setOpen(!open)}>
  <FaShare className="icon" color="white" /> Share
      
    </div>
  
    <div className={`links-container mx-2 ${open ? 'open' : ''}`}>
      {/* Copy Link */}
      <FontAwesomeIcon icon={faLink} className="links-icon" onClick={handleCopyLink} />
      
      {/* Facebook Share */}
      <FontAwesomeIcon icon={faFacebook} className="links-icon" onClick={handleFbShare} />
      
      {/* WhatsApp Share */}
      <a href={`https://wa.me/?text=${window.location}`} rel="nofollow noopener" className='mx-auto mt-3' target="_blank">
        <FontAwesomeIcon icon={faWhatsapp} className="links-icon " />
      </a>
  
      {/* Twitter Share */}
      <FontAwesomeIcon icon={faInstagram} className="links-icon " onClick={handleInstagramShare} />
  
      {/* LinkedIn Share */}
      <FontAwesomeIcon icon={faLinkedin} className="links-icon " onClick={handleLinkedinShare} />
    </div>
  </div>
  
  );
}

export default ShareDropdown