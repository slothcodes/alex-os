import React from "react";
import NewsCard from "./NewsCard.jsx";
import {Select, MenuItem, Button } from '@mui/material';
import './styles/Body.css';

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
    const newsCards = currentStories.map((story) => {
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
            <h1>Stories</h1>
            {newsCards}
            <div className="pagination">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(props.stories.length / props.sliceLength)}>Next</Button>
            </div>

        </div>
    );
}

export default Body;
