
import React from "react";

const ArticleWriterAssistantInfo = () => {
  return (
    <div className="articleWriterAssistantInfo">
      <h1>Article Writer Assistant</h1>
      
      <h2>Introduction</h2>
      <p>The Article Writer Assistant is an application designed to streamline the article creation process. 
         With a focus on simplifying outline formation and drafting, it uniquely integrates the ChatGPT API 
         to generate potential subheadings for outlining and completing articles. 
         This project is a compelling example of how AI can enhance productivity.</p>
      
      <h2>AI-Powered Content Generation</h2>
      <p>The app is integrated with the ChatGPT API to generate meaningful subheadings and articles 
         based on user queries, as seen in the OutlinePromptResults.jsx and FinalOutline.jsx components.</p>
         
      <h2>Stateful Components</h2>
      <p>The application uses React to manage complex states across multiple components. 
         For example, OutlineForm.jsx handles the user's query and prompt selection while 
         textEditor.jsx contains the state of the text editor.</p>
         
      <h2>Rich Text Editing</h2>
      <p>The textEditor.jsx component utilizes Draft.js for rich text editing, enabling users 
         to interact with the generated article in a fully editable environment. 
         This allows them to edit the article output quickly.</p>
         
      <h2>Major Components</h2>
      <ul>
        <li>OutlineForm.jsx for query input</li>
        <li>OutlinePromptResults.jsx for displaying API-generated subheadings</li>
        <li>FinalOutline.jsx for managing the final article outline</li>
        <li>SubheadingCard.jsx for individual subheadings</li>
        <li>EditorContainer.jsx and OutlineContainer.jsx as main containers for different phases of the article creation process</li>
      </ul>
      
      <h2>State Management with Redux</h2>
      <p>The app employs Redux for efficient state management across components, 
         enabling features like outline manipulation and storing the final article.</p>
         
      <h2>Material-UI Integration</h2>
      <p>The application uses Material-UI components for a modern and intuitive user interface, 
         such as the OutlineForm.jsx and OutlinePromptResults.jsx components.</p>
         
      <h2>Redux Slices</h2>
      <p>The Redux slices are efficiently organized to handle different aspects of the application, 
         from managing the outline to storing the article content. 
         This approach makes it easier to effectively manage the queries the user is submitting, 
         the responses from the API, and the final article.</p>
    </div>
  );
};

export default ArticleWriterAssistantInfo;
