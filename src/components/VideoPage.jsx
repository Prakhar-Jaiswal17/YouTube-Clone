import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";


export default function VideoPage(){
    const[likes,setLikes]=useState(0)
    const[views,setViews]=useState(0)
    const [description,setDescription] = useState('')
    const [channelName,setChannelName] = useState('')
    const [channelImage,setChannelImage] = useState('')
    const [subs,setSubs] = useState(0)
    const { videoId } = useParams()
    useEffect(()=>{async function f() {
        let res=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
        let data=await res.json()
        let channelId=data.items[0].snippet.channelId
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        const channelRes = await fetch(channelUrl)
        const channelData = await channelRes.json()
        console.log(channelData)  
        setLikes(data.items[0].statistics.likeCount)
        setViews(data.items[0].statistics.viewCount)
        setDescription(data.items[0].snippet.description)
        setChannelName(channelData.items[0].snippet.title)
        setChannelImage(channelData.items[0].snippet.thumbnails.default.url)
        setSubs(channelData.items[0].statistics.subscriberCount)
    }
    f()
    },[])
    return (
        <div className="video-page-container">
            <div className="player-wrapper">
                <iframe
                    width="70%" 
                    height="500"
                    aspect-ratio='16/9'
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    // add autoplay turned off for testing purpoes
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="video-details">
                <h1>Views : {views}</h1>
                <h1>Likes : {likes}</h1>
                <pre>{description}</pre>
            </div>
        </div>
    );
}