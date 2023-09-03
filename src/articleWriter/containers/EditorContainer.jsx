import React from "react";
import { Button } from "@mui/material";
import TextEditor from "../components/editorComponents/textEditor";
import { useSelector } from "react-redux";
import { convertFromRaw, EditorState } from "draft-js";
import './EditorContainer.css'

export default function EditorContainer(props) {
    const reduxContent = useSelector(state => state.article.article)
    const editorContent = EditorState.createWithContent(convertFromRaw(reduxContent))
    const contentState = editorContent.getCurrentContent();

    const handleCopyToClipboard = () => {
        const textString = contentState.getPlainText();
        navigator.clipboard.writeText(textString).then(() => {
        }).catch(err => {
          console.error("Could not copy text: ", err);
        });
      };

    return (
        <>
            <h1>Draft Article</h1>
            <div className="writing-app-container">
                <TextEditor />
                <div className="editor-buttons">
                    <Button variant="contained" color="primary" onClick={props.setEditorState}>Back to Outline</Button>
                    <Button variant="contained" color="primary" onClick={handleCopyToClipboard}>Copy To Clipboard</Button>
                </div>
            </div>
        </>
        
    );
}
