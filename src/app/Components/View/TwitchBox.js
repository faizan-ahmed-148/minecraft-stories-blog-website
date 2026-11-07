import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import horizon_line from '../../../../public/assets/images/Horizonline.svg';
import Image from 'next/image';
import { getBaseUrl } from '@/config';

const TwitchBox = () => {
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState([]); // Dynamically fetched channels
  const baseUrl = getBaseUrl();

  // Fetch channel data dynamically from the API
  const fetchChannelIds = async () => {
    const apiUrl = `${baseUrl}/client/getStreamers`;
    try {
      const response = await axios.get(apiUrl);
      const streamers = response?.data?.streamer || [];
      setChannels(streamers); // Save channels to state
    } catch (error) {
      toast.error('Error fetching channel data.');
    }
  };

  // Fetch streams for a specific channel
  const fetchStreams = async (channelName) => {
    try {
      const response = await axios.get(`/api/twitchrss?channel=${channelName}`);
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, 'application/xml');
      const items = Array.from(xml.querySelectorAll('item'));
console.log(items, '==> Response twicth');

      return items.map((item) => ({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        description: item.querySelector('title')?.textContent,
        islive: item.querySelector('title')?.textContent?.toLowerCase().includes('live'),
        thumbnail: item.querySelector('description')?.textContent?.match(/<img src="([^"]+)"/)
          ? item.querySelector('description')?.textContent?.match(/<img src="([^"]+)"/)[0]
          : '',
        channelName
      }));
    } catch (error) {
      console.error(`Error fetching streams for channel ${channelName}:`, error);
      return [];
    }
  };

  // Fetch all streams for the channels dynamically
  const loadStreams = async () => {
    setIsLoading(true);
    try {
      let allStreams = [];
      await Promise.all(
        channels.map(async (channel) => {
          const channelStreams = await fetchStreams(channel.channel); // Use channel name dynamically
          allStreams = [...allStreams, ...channelStreams];
        })
      );
      setStreams(allStreams); // Save all fetched streams
    } catch (error) {
      console.error('Error fetching streams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial setup: Fetch channels and then their streams
  useEffect(() => {
    const fetchData = async () => {
      await fetchChannelIds(); // Fetch channel IDs first
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (channels.length > 0) {
      loadStreams(); // Load streams after channels are fetched
    }
  }, [channels]);


  return (
    <div className="twitch-box">
    <h1 className="twitch-title">LIVE STREAMERS</h1>
    <div className="hori_line">
      <Image className="horizon-line" width="100" height="100" src={horizon_line} alt="horizon line" />
    </div>
    <div className="streamer-list">
      {streams && streams.filter((stream) => stream.islive).length > 0 ? ( // Filter for only live streams
        streams
          .filter((stream) => stream.islive) // Only include live streams
          
          .map((stream, index) => (
            <Link
              href={stream.link}
              key={index}
              className="streamer-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={
                stream?.thumbnail || 
                `https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.channelName.toLowerCase()}-640x360.jpg`
              } alt={stream?.title} className="streamer-image" />
              <div className="streamer-info">
                <h6 className="streamer-name">{stream?.channelName}</h6>
                <p className="streamer-desc">{stream?.description}</p>
                <span className="watching"> Click To Watch</span>
              </div>
              <div className="live-indicator live">
                <span className="live-dot live"></span> LIVE
              </div>
            </Link>
          ))
      ) : (
        <p className='d-flex justify-content-center text-white'>No streamers are live right now.</p> // Message when no live streams are available
      )}
    </div>
  </div>
  
  );
};

export default TwitchBox;
