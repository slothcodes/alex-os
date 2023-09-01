import { useState } from 'react'
import OutlineContainer from './containers/OutlineContainer'
import EditorContainer from './containers/EditorContainer'
import './ArticleWriterApp.css'

function ArticleWriterApp(props) {
  const [editorState, setEditorState] = useState(false)
  const editorHandler = () => {
      setEditorState(!editorState)
    }
  
  return (
    <>
      <div className="card">
        {editorState ? <EditorContainer setEditorState = {editorHandler}/> : <OutlineContainer setEditorState = {editorHandler}/>}

      </div>
    </>
  )
}

export default ArticleWriterApp
