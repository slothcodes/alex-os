import React from "react";
import { Button } from "@mui/material";
import TextEditor from "../components/editorComponents/textEditor";

export default function EditorContainer(props) {

    return (
        <div>
            <h1>Editor</h1>
            <TextEditor />
            <Button variant="contained" color="primary" onClick={props.setEditorState}>Back to Outline</Button>
        </div>
    );
}
