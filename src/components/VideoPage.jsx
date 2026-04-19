import { useParams } from "react-router-dom";
import { useEffect } from "react";


export default function VideoPage(){
    const { videoId } = useParams()
    return (
        <div className="video-page-container">
            <div className="player-wrapper">
                <iframe
                    width="50%" 
                    height="500"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="30"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            
            <div className="video-details">
                <h1>Video ID: {videoId}</h1>
                <p>Add video description or channel info here later!</p>
            </div>
        </div>
    );
}