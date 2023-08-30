import React from "react";
import OutlineForm from "../components/outlineComponents/OutlineForm";
import OutlinePromptResults from "../components/outlineComponents/OutlinePromptResults";
import FinalOutline from "../components/outlineComponents/FinalOutline";
import {Button} from '@mui/material'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setArticle } from "../../redux/combinedActions.js";
import { getOutline, getArticle } from "../../redux/combinedSelectors";
import { ContentState, convertFromRaw, convertToRaw } from "draft-js";

export default function OutlineContainer(props) {
        // add clickhandler to button to send user to article editor 
        console.log('props',props)
        const dispatch = useDispatch()
        const outLineList = useSelector(getOutline(state => state))//.outline.outline))
        console.log('outline',outLineList)
        const articleState = useSelector(getArticle(state => state.article.article))
        const clickHandler = async () => {
            // send request for article to backend
            const article = await fetch('api/getArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({promptText: outLineList.join(','), promptType: 'article'}),
            })
            // get response from backend
            const articleJson = await article.json()
            // convert article to raw for draftjs
            console.log('article',articleJson.response)
            const convertedToContentState = ContentState.createFromText(articleJson.response[0]) 
            const convertedArticle = convertToRaw(convertedToContentState)
            dispatch(setArticle(convertedArticle))
            // convert button to loading mui component while waiting for response
            // set article editor state to shown
            props.setEditorState()
        }
        return (
            <div>
                <OutlineForm />
                <OutlinePromptResults />
                <FinalOutline />
                <Button variant="contained" color="primary" onClick={clickHandler} >Write Article</Button>
                {convertFromRaw(articleState).hasText() !== false ? <Button variant="contained" color="primary" onClick={props.setEditorState}>Article Editor</Button> : null}
            </div>
        );
    }