import { useState, useEffect } from "react"
import SearchCards from "./SearchCards"
import { useParams } from "react-router-dom"

function SearchPage() {
    const [videos, setVideos] = useState([])
    const [channels, setChannels] = useState({})
    let { query } = useParams()
    // let query = 'nagisa'
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    useEffect(() => {
        async function fetchingSearch() {
            try {
                let res = await (await fetch(url)).json();
                let items = res.items;
                if (!items) return;
                let ids = items.map(x => x.snippet.channelId).join(',')
                let prom = await (await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)).json()
                let temp = {};
                if (prom.items) {
                    prom.items.forEach(x => {
                        temp[x.id] = x.snippet.thumbnails.default.url
                    });
                }
                setChannels(temp)
                setVideos(items)
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchingSearch()
    }, [])
    return (
        <div>
            {videos.map((x, idx) => (
                <SearchCards key={x.id.videoId} data={x} channelImgUrl={channels[x.snippet.channelId]} />
            ))}
        </div>
    )
}
export default SearchPage