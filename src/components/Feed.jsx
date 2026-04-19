import Cards from "./Cards.jsx"
import { Link } from "react-router-dom"


export default function Feed({data, channelImgUrl}){

    data = data.map((x,idx)=>{
        return <Cards key={x.id} video = {x} channelImgUrl={channelImgUrl[x.snippet.channelId]}/>
    })

    return (
        <div id="container">
            {data}
        </div>
    )
}