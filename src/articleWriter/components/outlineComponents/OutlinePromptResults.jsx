import React from "react";
import {setList,addToOutline} from '../../../redux/combinedActions'
import { useDispatch, useSelector } from "react-redux";
import SubheadingCard from "./SubheadingCard";
import { convertToRaw } from 'draft-js';
import {CircularProgress } from '@mui/material'
import './OutlinePromptResults.css'

export default function OutlinePromptResults(props) {
    const dispatch = useDispatch();

    // Get the data directly from Redux store
    const resultsFromRedux = useSelector(state => state.promptResults.results);
    const selectedArray = useSelector(state => state.outline.outline);
    // make list of divs for each item in results list from redux store
    const handleAddClick = (event) => {
        // get text from subheading card from the value of the button
        const subheadingText = event.target.value
        // add subheading to outline state
        dispatch(addToOutline(subheadingText))
    }

    const subheadingComponents = resultsFromRedux.map((item,index) => {
            // check whether subheading is already in outline and disable button if it is
            const inList = selectedArray.includes(item)
            return <SubheadingCard key={index} Subheading={item} clickHandler={handleAddClick} disabled={inList} buttonText='Add'/>
    })
    const isOutlinePopulated = resultsFromRedux.length > 0 ? true : false 
    const loadingComponent = <CircularProgress style={{'color': 'blue', 'alignSelf':'center'}} />
    const contentComponent = isOutlinePopulated ? subheadingComponents: <h4>Please add some subheadings to your outline</h4> 
    const content = isOutlinePopulated ? loadingComponent : contentComponent
    return (
        <div className={isOutlinePopulated ? "prompt-results": "prompt-results-empty"}>
            <h1>Prompt Results</h1>
            {props.isSubLoading ? loadingComponent : null}
            {contentComponent}
        </div>
    );
}