import React from 'react';
import Header from '../components/Header.jsx';
import Body from '../components/Body.jsx';
import './NewsReader.css';

const NewsReader = () => {
    const [stories, setStories] = React.useState({'sports':[],'news':[],'gaming':[],'tech':[]});
    const [loading, setLoading] = React.useState(true);
    const [activeStories, setActiveStories] = React.useState([]); 
    const [category, setCategory] = React.useState('1');
    const [sliceLength, setSliceLength] = React.useState(5);
    
    // fetch news stories on load
    React.useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('/getNews');
                const data = await response.json();
                setStories(data.results);
                getCategory();  // Update the active stories based on the initial category
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }
        fetchNews();
    }, []);

    React.useEffect(() => {
        getCategory();
    }, [stories,category]);
    // filter news stories by category    
    // React.useEffect(() => {
    //     getCategory();
    // }, [category]);
    // change number of stories per page
    const handleSliceChange = (event) => {
        setSliceLength(event.target.value);
    };
    // map selected category to news stories
    const getCategory = () => {
        switch (category) {
            case '1':
                setActiveStories(stories['news']);
                return;
            case '2':
                setActiveStories(stories['sports']);
                return 
            case '3':
                setActiveStories(stories['gaming']);
                return 
            case '4':
                setActiveStories(stories['tech']);
                return 
            default:
                setActiveStories(stories['news']);
                return 
        }
    };

    return (
        <div className='newsreader'>
            <h1>NewsReader</h1>
            <Header category= {category} setCategory={setCategory} sliceLength={sliceLength} handleSliceChange={handleSliceChange}/>  
            {loading ? <h1>Loading...</h1>: <Body stories={activeStories} sliceLength={sliceLength} />}
        </div>
    );
}

export default NewsReader