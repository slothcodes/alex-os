import React from "react";
import NewsCard from "./NewsCard.jsx";
import {Select, MenuItem } from '@mui/material';

const Body = (props) => {
    const [visitedStories, setVisitedStories] = React.useState([]);
    
    const [currentPage, setCurrentPage] = React.useState(1);
    
    // Use url to check if a story is visited
    const isVisited = (storyURL) => {
        return visitedStories.includes(storyURL); 
    };
    
    // Use url to mark a story as visited
    const handleLinkClick = (storyURL) => {
        if (!isVisited(storyURL)) {
            setVisitedStories([...visitedStories, storyURL]) 
        }
    };
    // move to next page
    const handleNextPage= () => {
        setCurrentPage(currentPage + 1);
    };
    // move to previous page
    const handlePrevPage= () => {
        setCurrentPage(currentPage - 1);
    };
    // reset position to first page when props.stories changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [props.stories]);
    const lastIndex = currentPage * props.sliceLength;
    const firstIndex = lastIndex - props.sliceLength;
    const currentStories = props.stories.slice(firstIndex, lastIndex);
    const newsCards = currentStories.map((story) => { //props.stories.map((story) => {
        return (
            <NewsCard 
                key={story.id} 
                className={isVisited(story.url) ? 'visited' : ''} // Pass the entire story object to isVisited
                story={story} 
                handleLinkClick={handleLinkClick}
            />
        );
    });

    return (
        <div className="newsBody">
            <h1>Body</h1>
            
            {newsCards}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(props.stories.length / props.sliceLength)}>Next</button>
            </div>

        </div>
    );
}

export default Body;
