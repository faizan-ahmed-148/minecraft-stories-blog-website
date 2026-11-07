'use client';

import Script from "next/script";
import React, { useEffect, useRef } from "react";

const AdSenseComponent = ({
  pubId,
  slotId,
  width = 100,
  height = 90,
  responsive = false,
}) => {
  const adLoaded = useRef(false); // Track if adsbygoogle.push({}) was already called

  useEffect(() => {
    // Check if AdSense script is already in the DOM
    if (!document.querySelector(`script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}"]`)) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.adsbygoogle && !adLoaded.current) {
          window.adsbygoogle.push({});
          adLoaded.current = true; // Mark as loaded to prevent duplicate calls
        }
      };
    } else {
      // If script is already loaded, only push once
      if (window.adsbygoogle && !adLoaded.current) {
        window.adsbygoogle.push({});
        adLoaded.current = true;
      }
    }
  }, [pubId]); // Run effect when pubId changes

  return (
    <div>
      {/* AdSense Ad Container */}
      <ins
        className="adsbygoogle"
        style={{
          display: responsive ? "block" : "inline-block",
          width: responsive ? undefined : `${width}%`,
          height: responsive ? undefined : `${height}px`,
        }}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        data-ad-format={responsive ? "auto" : undefined} // For responsive ads
      ></ins>
    </div>
  );
};

export default AdSenseComponent;
