import React from "react";
import OutlineForm from "../components/outlineComponents/OutlineForm";
import OutlinePromptResults from "../components/outlineComponents/OutlinePromptResults";
import FinalOutline from "../components/outlineComponents/FinalOutline";
import {Button} from '@mui/material'
import { useSelector,useDispatch  } from "react-redux";
import { setArticle } from "../../redux/combinedActions.js";
import { getOutline, getArticle } from "../../redux/combinedSelectors";
import { ContentState, convertFromRaw, convertToRaw } from "draft-js";
import './OutlineContainer.css'

export default function OutlineContainer(props) {
        // add clickhandler to button to send user to article editor 
        const dispatch = useDispatch()
        const outLineList = useSelector(state => getOutline(state))
        const articleState = useSelector(state => getArticle(state))
        const [isArticleLoading, setIsArticleLoading] = React.useState(false);
        const [isSubLoading, setIsSubLoading] = React.useState(false);
        const clickHandler = async () => {
            // send request for article to backend
            setIsArticleLoading(true)
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
            const convertedToContentState = ContentState.createFromText(articleJson.response[0]) 
            const convertedArticle = convertToRaw(convertedToContentState)
            dispatch(setArticle(convertedArticle))
            setIsArticleLoading(false)
            // convert button to loading mui component while waiting for response
            // set article editor state to shown
            props.setEditorState()
            
        }

        return (
            <div className="outlineContainer">
                <OutlineForm setIsSubLoading={setIsSubLoading} isSubLoading={isSubLoading}/>
                <OutlinePromptResults isSubLoading={isSubLoading}/>
                <FinalOutline isArticleLoading={isArticleLoading} setIsArticleLoading={setIsArticleLoading}/>
                <div className="outlineButtons">
                    <Button variant="contained" color="primary" onClick={clickHandler} disabled={isArticleLoading}>Write Article</Button>
                    {convertFromRaw(articleState).hasText() !== false ? <Button variant="contained" color="primary" onClick={props.setEditorState}>Article Editor</Button> : null}
                </div>
                
            </div>
        );
    }