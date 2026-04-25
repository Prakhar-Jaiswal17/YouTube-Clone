import { useState,useEffect } from "react"
import SearchPage from "./SearchPage.jsx"
import Sidebar from "./Sidebar.jsx"
import Feed from './Feed.jsx'
import { useOutletContext } from "react-router-dom"
export default function Home(){

    const [videos,setVideos] = useState([])
    const [channels,setChannels] = useState([])
    const {sidebarDiplay} = useOutletContext()

    useEffect(()=>{
        async function fetchData() {
            try{
                let data = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=GB&maxResults=48&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
                data = await data.json()
                data = data.items
                // console.log(data);
                let ids = data.map(x => x.snippet.channelId).join(',');
                
                let prom = await(await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)).json()
                // console.log(prom);
                prom = prom.items
                // prom = prom.map(x=>x.snippet.thumbnails.default.url)

                let temp = {};
                prom.forEach(x => {
                    temp[x.id] = x.snippet.thumbnails.default.url
                });
                // console.log(temp);
                setVideos(data)
                setChannels(temp)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fetchData()
    },[])


    return (
        <div id="Homepage">
            {/* <Sidebar /> */}
            {sidebarDiplay && <Sidebar />}
            <section id="home">
            <Feed data = {videos} channelImgUrl = {channels} />
            </section>
        </div>
    )
}