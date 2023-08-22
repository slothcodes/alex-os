import React from "react";
import drafjs from "draft-js";

const { Editor, EditorState, RichUtils } = drafjs;

const ResumeWindow = () => {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );
    const editor = React.useRef(null);
    const focusEditor = () => {
        editor.current.focus();
    };
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
        setEditorState(newState);
        return "handled";
        }
        return "not-handled";
    };
    const onUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    };
    const onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };
    const onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };
    return (
        <div className="editorContainer">
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onBoldClick}>
            <b>B</b>
        </button>
        <button onClick={onItalicClick}>
            <em>I</em>
        </button>
        <div className="editors">
            <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            ref={editor}
            />
        </div>
        </div>
    );
    }

export default ResumeWindow;