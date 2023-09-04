
import React from "react";

const ArticleWriterAssistantInfo = () => {
  return (
    <div className="articleWriterAssistantInfo">
      <h1>Article Writer Assistant</h1>
      
      <h2>Introduction</h2>
      <p>The Article Writer Assistant serves as a powerful tool for writers, leveraging the ChatGPT API to assist in outline creation and article drafting, ultimately showcasing the potent role of AI in enhancing writing productivity.</p>
      
      <h2>AI-Powered Content Generation</h2>
      <p>Integrated with the ChatGPT API, the application intelligently generates subheadings and articles. This is mainly accomplished in the  OutlinePromptResults.jsx and FinalOutline.jsx components.</p>
         
      <h2>Stateful Components</h2>
      <p>The application employs React to handle state across components. For example, OutlineForm.jsx is responsible for capturing user queries, while textEditor.jsx manages the state of the real-time text editor.</p>
         
      <h2>Rich Text Editing</h2>
      <p>TUsing Draft.js, the textEditor.jsx component furnishes a feature-rich text editing environment, offering users the flexibility to edit generated articles.</p>
         
      <h2>Major Components</h2>
      <ul>
        <li>OutlineForm.jsx for query input</li>
        <li>OutlinePromptResults.jsx for displaying API-generated subheadings</li>
        <li>FinalOutline.jsx for managing the final article outline</li>
        <li>SubheadingCard.jsx for individual subheadings</li>
        <li>EditorContainer.jsx and OutlineContainer.jsx as main containers for different phases of the article creation process</li>
      </ul>
      
      <h2>State Management with Redux</h2>
      <p>For efficient state management, the application harnesses Redux, enabling capabilities such as manipulating outlines and preserving the final article.</p>
         
      <h2>Material-UI Integration</h2>
      <p>For an appealing and easy-to-navigate UI, the app incorporates Material-UI components, particularly in sections like OutlineForm.jsx and OutlinePromptResults.jsx.</p>
         
      <h2>Redux Slices</h2>
      <p>The app utilizes Redux slices to efficiently manage distinct its state. This ranges from handling user queries and API responses to storing the finalized article content.</p>
    </div>
  );
};

export default ArticleWriterAssistantInfo;
