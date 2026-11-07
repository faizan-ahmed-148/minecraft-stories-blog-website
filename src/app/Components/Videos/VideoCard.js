import React from 'react';
import './VideoCard.scss';
import Link from 'next/link';

const VideoCard = ({ video }) => {
  const { title, thumbnails, channelTitle } = video.snippet;

  return (
    <Link 
    href={`https://www.youtube.com/watch?v=${video?.id?.videoId}`}
    target='_blank'
     className="videos-card">
      <img src={thumbnails.medium.url} alt={title} className="videos-card-thumbnail" />
      <div className="videos-card-info">
      <p className="videos-card-channel">{channelTitle}</p>

        <h3 className="videos-card-title">{title}</h3>
      </div>
    </Link>
  );
};

export default VideoCard;
