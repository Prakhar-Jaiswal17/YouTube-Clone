import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoInfo from "./VideoInfo";
import RecommendedVideos from "./RecommendedVideos";
import "./VideoPage.css";

export default function VideoPage(){
    // const[likes,setLikes]=useState(0)

    // const[views,setViews]=useState(0)
    // const [description,setDescription] = useState('')
    // const [channelName,setChannelName] = useState('')
    // const [channelImage,setChannelImage] = useState('')
    // const [subs,setSubs] = useState(0)
    // const { videoId } = useParams()
    // useEffect(()=>{async function f() {
    //     let res=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
    //     let data=await res.json()
    //     let channelId=data.items[0].snippet.channelId
    //     const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    //     const channelRes = await fetch(channelUrl)
    //     const channelData = await channelRes.json()
    //     console.log(channelData)  
    //     setLikes(data.items[0].statistics.likeCount)
    //     setViews(data.items[0].statistics.viewCount)
    //     setDescription(data.items[0].snippet.description)
    //     setChannelName(channelData.items[0].snippet.title)
    //     setChannelImage(channelData.items[0].snippet.thumbnails.default.url)
    //     setSubs(channelData.items[0].statistics.subscriberCount)
    // }
    // f()
    // },[])
    // return (
    //     <div className="video-page-container">
    //         <div>
    //             <div className="player-wrapper">
    //                 <iframe
    //                     width="70%" 
    //                     height="500"
    //                     aspect-ratio='16/9'
    //                     src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    //                     title="YouTube video player"
    //                     frameBorder="0"
    //                     // add autoplay turned off for testing purpoes
    //                     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //                     allowFullScreen
    //                 ></iframe>
    //             </div>
    //             <VideoDetails 
    //                 channelImage={channelImage}
    //                 channelName={channelName}
    //                 subs={subs}
    //                 likes={likes}
    //                 views={views}
    //                 description={description}
    //             />
    //         </div>
    //         <div>

    //         </div>
    //     </div>
    // );
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [channelName, setChannelName] = useState('');
    const [channelImage, setChannelImage] = useState('');
    const [subs, setSubs] = useState(0);
    const [loading, setLoading] = useState(true);
    const { videoId } = useParams();
 
    useEffect(() => {
        async function fetchVideoData() {
            setLoading(true);
            try {
                // Fetch video details
                let res = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
                );
                let data = await res.json();
                
                if (data.items && data.items.length > 0) {
                    const videoData = data.items[0];
                    let channelId = videoData.snippet.channelId;
 
                    // Fetch channel details
                    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
                    const channelRes = await fetch(channelUrl);
                    const channelData = await channelRes.json();
 
                    // Set all state
                    setTitle(videoData.snippet.title);
                    setLikes(videoData.statistics.likeCount);
                    setViews(videoData.statistics.viewCount);
                    setDescription(videoData.snippet.description);
                    
                    if (channelData.items && channelData.items.length > 0) {
                        setChannelName(channelData.items[0].snippet.title);
                        setChannelImage(channelData.items[0].snippet.thumbnails.default.url);
                        setSubs(channelData.items[0].statistics.subscriberCount);
                    }
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setLoading(false);
            }
        }
 
        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);
 
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
 
    return (
        <div className="video-page-container">
            <div className="main-content">
                <VideoPlayer videoId={videoId} />
                <VideoInfo 
                    title={title}
                    channelImage={channelImage}
                    channelName={channelName}
                    subs={subs}
                    likes={likes}
                    views={views}
                    description={description}
                />
            </div>
            <div className="sidebar">
                <RecommendedVideos 
                    currentVideoTitle={title} 
                    currentVideoId={videoId}
                    
                />
            </div>
        </div>
    );
}