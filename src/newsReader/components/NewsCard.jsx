import React from "react";
//import css file
import './styles/NewsCard.css';

const NewsCard = (props) => {
    
    const date = new Date(props.story.pubDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const pubDate = date.toLocaleDateString('en-US', options);
    return (
        <div className={`newsCard ${props.className}`}>
           <a href={props.story.url} target="_blank" rel="noopener noreferrer" onClick={()=>{props.handleLinkClick(props.story.url)}}>{props.story.title} {pubDate}</a>    
        </div>
    );
}

export default NewsCard