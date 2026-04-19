import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
export default function Cards({video, channelImgUrl}){
    const videoId = video.id.videoId || video.id
    let thumbnail = video.snippet.thumbnails.medium.url;
    let title = video.snippet.title;
    let channelName = video.snippet.channelTitle;
    let viewCount = video.statistics?.viewCount;
    let views=''
    if (viewCount) {
        if(viewCount>=1000000)
            views = ((viewCount/1000000).toFixed(1)).toString()+'m views'
        else if(viewCount>=100000)
            views = Math.round((viewCount/1000)).toString()+'k views'
        else if(viewCount>=1000)
            views = ((viewCount/1000).toFixed(1)).toString()+'k views'
        else
            views = viewCount.toString()+' views'
    } else {
        views='No data'
    }
    return (
        <Link to={`/watch/${videoId}`} className="video-redirector">
        <div className="video-container">
            <img src={thumbnail} alt="thumbail" className="thumbnail"/>
            <div className="card-video-details">
                <div>
                    <img src={channelImgUrl} alt="Channel Image" />
                </div>
                <div>
                    <h4>{title}</h4>
                    <p>{channelName}</p>
                    <p>{views}</p>
                </div>
            </div>
        </div>
        </Link>
    )
}