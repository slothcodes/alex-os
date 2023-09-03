import React, { useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { useSelector, useDispatch } from "react-redux";
import { setArticle } from "../../../redux/combinedActions.js";
import './TextEditor.css'
export default function TextEditor(props) {
  const dispatch = useDispatch();
  // get article text for editor
  const rawArticleContent = useSelector(state => state.article.article);

  // Convert the raw content from Redux into an EditorState instance
  const initialEditorState = EditorState.createWithContent(convertFromRaw(rawArticleContent));
  const [editorState, setEditorState] = useState(initialEditorState);

  const handleEditorChange = (newEditorState) => {
    // Update the local editor state
    setEditorState(newEditorState);

    // Convert the new editor state to raw content and dispatch to Redux
    dispatch(setArticle(convertToRaw(newEditorState.getCurrentContent())));
  };
  
  return (
    <div className="text-editor">
        <Editor editorState={editorState} onChange={handleEditorChange} />
    </div>
  );
}
