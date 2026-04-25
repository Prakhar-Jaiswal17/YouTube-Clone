import React, { useState } from 'react';
import { ThumbsUp, Share2, Download, MoreHorizontal } from 'lucide-react';

export default function VideoInfo({ 
    channelImage, 
    channelName, 
    subs, 
    likes, 
    views, 
    description,
    title 
}) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num?.toString() || '0';
    };

    return (
        <div className="video-info">
            {/* Video Title */}
            <h1 className="video-title">{title || 'Video Title'}</h1>

            {/* Channel Info & Actions */}
            <div className="video-meta">
                <div className="channel-info">
                    <img 
                        src={channelImage || 'https://via.placeholder.com/40'} 
                        alt={channelName}
                        className="channel-avatar"
                    />
                    <div className="channel-details">
                        <h3 className="channel-name">{channelName || 'Channel Name'}</h3>
                        <p className="subscriber-count">{formatNumber(subs)} subscribers</p>
                    </div>
                    <button 
                        className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                        onClick={() => setIsSubscribed(!isSubscribed)}
                    >
                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                </div>

                <div className="video-actions">
                    <button className="action-btn">
                        <ThumbsUp size={20} />
                        <span>{formatNumber(likes)}</span>
                    </button>
                    <button className="action-btn">
                        <Share2 size={20} />
                        <span>Share</span>
                    </button>
                    <button className="action-btn">
                        <Download size={20} />
                        <span>Download</span>
                    </button>
                    <button className="action-btn more-btn">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            {/* Description Box */}
            <div className="video-description">
                <div className="description-header">
                    <span className="view-count">{formatNumber(views)} views</span>
                </div>
                <div className={`description-text ${showFullDescription ? 'expanded' : ''}`}>
                    {description || 'No description available'}
                </div>
                <button 
                    className="show-more-btn"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                >
                    {showFullDescription ? 'Show less' : 'Show more'}
                </button>
            </div>

            {/* Comments Section Placeholder */}
            <div className="comments-section">
                <h3 className="comments-header">Comments</h3>
                <p className="comments-placeholder">Comments section coming soon...</p>
            </div>
        </div>
    );
}