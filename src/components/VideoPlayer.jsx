import React from 'react';

export default function VideoPlayer({ videoId }) {
    return (
        <div className="video-player">
            <div className="player-wrapper">
                <iframe
                    width="100%" 
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}