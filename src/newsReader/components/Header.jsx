import React from 'react';
// import mui select
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';
import './styles/Header.css';


const Header = (props) => {
    const handleDropdownChange = (event) => {
        props.setCategory(event.target.value);
    };
    return (
        <div className='newsControls'>

            <div className="selectCategory">
                <FormControl>
                    <InputLabel id="prompt-selection">Topics</InputLabel>
                    <Select
                        labelId="category-selection"
                        id="category-selection"
                        value={props.category}
                        label="Topics"
                        onChange={handleDropdownChange}
                    >
                        <MenuItem value="1">News</MenuItem>
                        <MenuItem value="2">Sports</MenuItem>
                        <MenuItem value="3">Gaming</MenuItem>
                        <MenuItem value="4">Tech</MenuItem>
                    </Select>         
                </FormControl>
            </div>
            <div className="sliceLength">
                <FormControl>
                    <InputLabel id="length-selection">Count</InputLabel>
                    <Select labelId="length-selection"
                        id="stories-length"
                        value={props.sliceLength}
                        label="Count"
                        onChange={props.handleSliceChange}
                        >
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                    </Select>
                </FormControl>
                {/* <label htmlFor="sliceLength">Count</label> */}
                
            </div>
        </div>
    );
}

export default Header