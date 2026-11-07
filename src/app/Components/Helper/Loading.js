import React from 'react';
import './Loading.scss';
import Image from 'next/image';
import logo from '../../../../public/assets/images/logo.png';

const Loading = () => {
  return (
    <div className="loading-container">
      {/* Logo with rotation and glow */}
      <div className="loading-logo">
        <Image src={logo} alt="Game Logo" width={100} height={100} className="logo" />
      </div>

      {/* Spinning loader */}
      <div className="spinner"></div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default Loading;
