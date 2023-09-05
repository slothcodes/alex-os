import React from "react";
import { addToOutline, removeFromOutline } from "../../../redux/combinedActions";
import { useDispatch, useSelector } from "react-redux";
import SubheadingCard from "../outlineComponents/SubheadingCard";
import { CircularProgress } from '@mui/material'
import './FinalOutline.css'

export default function FinalOutline(props) {
    const dispatch = useDispatch();
    // make cards for current outline
    const handleRemoveClick = (event) => {
        // get text from subheading card from the value of the button
        const subheadingText = event.target.value
        // add subheading to outline state
        dispatch(removeFromOutline(subheadingText))
    }
    const outlineList = useSelector(state => state.outline.outline)
    const outlineListComponents = outlineList.map((item,index) => {
        return <SubheadingCard key={index} Subheading={item} clickHandler={handleRemoveClick} disabled={false} buttonText='Remove'/>
    })
    const isOutlinePopulated = outlineList.length > 0 ? true : false 
    const loadingComponent = <CircularProgress style={{'color': 'blue'}} />
    const contentComponent = isOutlinePopulated ? outlineListComponents: <h4>Please add some subheadings to your outline</h4>
    return (
        <div className={isOutlinePopulated ? "final-outline": "final-outline-empty"}>
            <h1>Final Outline</h1>            
            {props.isArticleLoading ? loadingComponent : contentComponent }
        </div>
    );
}