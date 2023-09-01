import React from "react";
import { addToOutline, removeFromOutline } from "../../../redux/combinedActions";
import { useDispatch, useSelector } from "react-redux";
import SubheadingCard from "../outlineComponents/SubheadingCard";

export default function FinalOutline() {
    const dispatch = useDispatch();
    // make cards for current outline
    const handleRemoveClick = (event) => {
        // get text from subheading card from the value of the button
        const subheadingText = event.target.value
        // add subheading to outline state
        console.log('t',subheadingText)
        dispatch(removeFromOutline(subheadingText))
    }
    const outlineList = useSelector(state => state.outline.outline)
    const outlineListComponents = outlineList.map((item,index) => {
        return <SubheadingCard key={index} Subheading={item} clickHandler={handleRemoveClick} disabled={false} buttonText='Remove'/>
    })
    return (
        <div className="final-outline">
            <h1>Final Outline</h1>
            {outlineListComponents}
        </div>
    );
}