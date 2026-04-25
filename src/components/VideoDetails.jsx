import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import './VideoDetails.css';

export default function VideoDetails({ channelImage, channelName, subs, likes, views, description }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(likes) || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    const videoUrl = window.location.href;
    navigator.clipboard.writeText(videoUrl);
    alert('Link copied to clipboard!');
  };

  const formatNumber = (num) => {
    const number = parseInt(num) || 0;
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + 'B';
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(0) + 'k';
    }
    return number.toString();
  };

  return (
    <div className="vd-container">
      {/* Channel Info Row with Subscribe Button */}
      <div className="vd-channel-row">
        <div className="vd-channel-left">
          {channelImage ? (
            <img 
              src={channelImage} 
              alt={channelName}
              className="vd-avatar"
            />
          ) : (
            <div className="vd-avatar-placeholder"></div>
          )}
          <div className="vd-channel-info">
            <div className="vd-channel-name">{channelName || 'Loading...'}</div>
            <div className="vd-channel-subs">
              {subs ? `${formatNumber(subs)} subscribers` : 'Loading...'}
            </div>
          </div>
        </div>
        
        {/* Subscribe Button */}
        <button 
          onClick={() => setIsSubscribed(!isSubscribed)}
          className={`vd-subscribe-btn ${isSubscribed ? 'vd-subscribed' : ''}`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="vd-actions">
        {/* Like/Dislike */}
        <div className="vd-like-container">
          <button 
            onClick={handleLike}
            className="vd-like-btn"
          >
            <ThumbsUp size={20} fill={isLiked ? 'white' : 'none'} />
            <span>{likes ? formatNumber(likeCount) : '0'}</span>
          </button>
          <div className="vd-divider"></div>
          <button className="vd-dislike-btn">
            <ThumbsDown size={20} />
          </button>
        </div>

        {/* Share Button */}
        <button onClick={handleShare} className="vd-share-btn">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      {/* Views Count */}
      {views && (
        <div className="vd-views">
          {formatNumber(views)} views
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="vd-description">
          <div className={`vd-desc-text ${isDescriptionExpanded ? 'vd-expanded' : ''}`}>
            {description}
          </div>
          <button 
            className="vd-desc-toggle"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            {isDescriptionExpanded ? '...less' : '...more'}
          </button>
        </div>
      )}
    </div>
  );
}