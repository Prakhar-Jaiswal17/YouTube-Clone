import { Link } from 'react-router-dom'

function SearchCards({ data, channelImgUrl }) {
    const thumbnail = data.snippet.thumbnails.high.url;
    const title = data.snippet.title;
    const channelTitle = data.snippet.channelTitle
    const videoId = data.id.videoId
    return (
        <Link to={`/watch/${videoId}`} className="video-redirector">
            <div>
                <div>
                    <img src={thumbnail} alt={title} />
                </div>
                <div>
                    <h2>{title}</h2>
                    <p>{channelTitle}</p>
                </div>
            </div>
        </Link>
    )
}

export default SearchCards