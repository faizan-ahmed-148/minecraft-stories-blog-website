import React from 'react';
import VideoCard from './VideoCard';
import './VideoList.scss';

const VideoList = ({ videos }) => {
  return (
    <div className="videos-list">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
