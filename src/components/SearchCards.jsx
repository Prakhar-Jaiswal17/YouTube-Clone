import { Link } from 'react-router-dom'

function SearchCards({ data, channelImgUrl }) {
    const thumbnail = data.snippet.thumbnails.high.url;
    const title = data.snippet.title;
    const channelTitle = data.snippet.channelTitle
    const videoId = data.id.videoId
    return (
        <Link to={`/watch/${videoId}`} className="video-redirector">
            <div className="search-card">
                <div className="search-card-thumbnail">
                    <img src={thumbnail} alt={title} />
                </div>
                <div className="search-card-details">
                    <h2>{title}</h2>
                    <div className="search-card-channel">
                        <img src={channelImgUrl} alt={channelTitle} className='card-video-img' style={{marginRight:"10px"}}/>
                        <span>{channelTitle}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchCards