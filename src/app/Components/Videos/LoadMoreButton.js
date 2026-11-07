import React from 'react';
import './LoadMoreButton.scss';

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className="videos-load-more" onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
