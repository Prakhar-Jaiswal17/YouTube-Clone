import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecommendedVideos({ currentVideoId }) {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTrendingAndShuffle() {
            try {
                // Fetching from the 'videos' endpoint for Trending data
                const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
                
                const res = await fetch(url);
                const data = await res.json();
                
                if (data.items) {
                    // Filter out current video and shuffle
                    const filtered = data.items.filter(video => video.id !== currentVideoId);
                    const shuffled = filtered.sort(() => Math.random() - 0.5);
                    
                    setVideos(shuffled.slice(0, 20));
                }
            } catch (error) {
                console.error('Error fetching trending videos:', error);
            }
        }

        fetchTrendingAndShuffle();
    }, [currentVideoId]);

    // Helper to format views (e.g., 1.2M, 45K)
    const formatViews = (num) => {
        if (!num) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleVideoClick = (videoId) => {
        navigate(`/watch/${videoId}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="recommended-videos">
            <h3 className="recommended-header">Recommended</h3>
            <div className="video-list">
                {videos.map((video) => (
                    <div 
                        key={video.id} 
                        className="video-card"
                        onClick={() => handleVideoClick(video.id)}
                    >
                        <div className="thumbnail-container">
                            <img 
                                src={video.snippet.thumbnails.medium.url} 
                                alt={video.snippet.title}
                                className="video-thumbnail"
                            />
                        </div>
                        <div className="video-details">
                            <h4 className="video-card-title">
                                {video.snippet.title}
                            </h4>
                            <p className="video-card-channel">
                                {video.snippet.channelTitle}
                            </p>
                            <div className="video-card-meta">
                                <span>{formatViews(video.statistics?.viewCount)} views</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}