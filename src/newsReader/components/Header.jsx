import React from 'react';
// import mui select
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';

const Header = (props) => {
    const handleDropdownChange = (event) => {
        props.setCategory(event.target.value);
    };
    return (
        <div>
            <div className="selectCategory">
                <h1>Header</h1>
                <FormControl>
                    <InputLabel id="prompt-selection">Options</InputLabel>
                    <Select
                        labelId="category-selection"
                        id="category-selection"
                        value={props.category}
                        label="Options"
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
                <label htmlFor="sliceLength">Stories per page:</label>
                <Select labelId="length-selection"
                id="stories-length"
                value={props.sliceLength}
                label="Options"
                onChange={props.handleSliceChange}
                >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                </Select>
            </div>
        </div>
    );
}

export default Header