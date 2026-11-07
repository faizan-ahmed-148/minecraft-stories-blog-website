'use client';
import React, { useEffect, useState } from 'react';
import './video.scss';
import axios from 'axios';
import LoadMoreButton from '../Components/Videos/LoadMoreButton';
import VideoList from '../Components/Videos/VideoList';
import { toast } from 'react-toastify';
import horizon_line from '../../../public/assets/images/Horizonline.svg';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { getBaseUrl } from '@/config';

const Videos = () => {
  const [videos, setVideos] = useState([]); 
  const [nextPageTokens, setNextPageTokens] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [channelIds, setChannelIds] = useState([]);
  const { settings_data } = useSelector((state) => state.minecraft_settings);
  const [useClient, setUseClient] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = getBaseUrl();
  const [hasMoreVideos, setHasMoreVideos] = useState(true);

  // Fetch channel IDs
  useEffect(() => {
    const fetchChannelIds = async () => {
      try {
        const response = await axios.get(`${baseUrl}/client/getYoutubers`);
        if (response?.data?.youtuber?.length > 0) {
          setChannelIds(response.data.youtuber);
          loadFeaturedVideo(response.data.youtuber);
          loadVideos(response.data.youtuber);
        } else {
          toast.error('No YouTube channels found.');
        }
      } catch (error) {
        console.error('Error fetching channel IDs:', error);
        toast.error('Error fetching YouTube channel data.');
      }
    };

    fetchChannelIds();
    setUseClient(true);
  }, []);

  // Fetch videos from a specific channel
  const fetchVideos = async (channelId, pageToken = '') => {
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=6&pageToken=${pageToken}`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching videos from channel ${channelId}:`, error);
      toast.error('Error fetching videos.');
      return { items: [], nextPageToken: null };
    }
  };

  // Load videos from all channels
  const loadVideos = async (idList = channelIds) => {
    if (!idList.length) {
      toast.error('No channels available to fetch videos.');
      return;
    }
  
    setLoading(true);
    try {
      let allVideos = new Map(); // Use Map to store unique videos
      let updatedTokens = { ...nextPageTokens };
      let hasMoreVideos = false; // Track if there are more videos to load
  
      await Promise.all(
        idList.map(async (channel) => {
          const pageToken = updatedTokens[channel.channel] || '';
          const response = await fetchVideos(channel.channel, pageToken);
  
          if (response.items.length > 0) {
            response.items.forEach((video) => {
              allVideos.set(video.id.videoId, video); // Store videos uniquely
            });
  
            if (response.nextPageToken) {
              updatedTokens[channel.channel] = response.nextPageToken;
              hasMoreVideos = true; // More videos available
            } else {
              updatedTokens[channel.channel] = null;
            }
          }
        })
      );
  
      setVideos((prevVideos) => {
        const uniqueVideos = new Map(prevVideos.map((v) => [v.id.videoId, v])); 
        allVideos.forEach((video, id) => uniqueVideos.set(id, video)); // Merge new videos uniquely
        return Array.from(uniqueVideos.values());
      });
  
      setNextPageTokens(updatedTokens);
      setHasMoreVideos(hasMoreVideos); // Update state to disable button if needed
    } catch (error) {
      console.error('Error loading videos:', error);
      toast.error('Error loading more videos.');
    }
    setLoading(false);
  };
  
  // Fetch and set the featured video
  const loadFeaturedVideo = async (idList) => {
    if (!idList.length) return;

    try {
      const response = await fetchVideos(idList[0]?.channel);
      if (response?.items?.length > 0) {
        setFeaturedVideo(response.items[0]); // Set the first video as featured
      }
    } catch (error) {
      console.error('Error loading featured video:', error);
      toast.error('Error loading featured video.');
    }
  };

  return (
    <>
      {useClient && (
        <div className="videos-container">
          <h1 className="videos-title">YouTube Channel Videos</h1>

          {/* Featured Video */}
          {settings_data?.settings?.featured_youtube_vdo || featuredVideo ? (
            <div className="featured-video">
              <h2>Featured Video</h2>
              <div className="hori_line">
                <Image
                  className="horizon-line"
                  src={horizon_line}
                  alt="horizon line"
                />
              </div>
              <iframe
                width="100%"
                height="400"
                src={
                  settings_data?.settings?.featured_youtube_vdo
                    ? settings_data?.settings?.featured_youtube_vdo
                    : `https://www.youtube.com/embed/${featuredVideo?.id?.videoId}`
                }
                title={featuredVideo?.snippet?.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No featured video available.</p>
          )}

          {/* Video List */}
          <VideoList videos={videos} />

          {/* Load More Button */}
       {/* Load More Button */}
{!loading && hasMoreVideos && videos.length > 0 && (
  <LoadMoreButton onClick={() => loadVideos()} />
)}

{/* Show message when no more videos */}
{!hasMoreVideos && <p className="no-more-videos">No more videos to load.</p>}

          {/* Loading Indicator */}
          {loading && <p className="videos-loading">Loading...</p>}
        </div>
      )}
    </>
  );
};

export default Videos;
