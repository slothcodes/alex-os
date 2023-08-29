import React from "react";

const AlexOSAppInfo = () => {
  return (
    <div className="alexOSAppInfo">
      <h1>AlexOS App</h1>
      
      <h2>Introduction</h2>
      <p>This AlexOS App is designed to mimic a desktop environment, providing an interactive and engaging 
         experience for anyone visiting my personal website.</p>
         
      <h2>Technical Highlights</h2>
      <h3>State Management with Redux</h3>
      <p>The application extensively uses Redux for state management, ensuring a robust and maintainable codebase. 
         This is particularly important for handling the state and positioning of the windows.</p>
         
      <h3>Component Architecture</h3>
      <p>The website is written in React and employs a modular approach for maintainability. 
         For instance, AppWindow.jsx is the base window component, while specialized windows like ResumeWindow.jsx 
         and ProjectWindow.jsx handle the displayed content.</p>
         
      <h3>Responsive Design</h3>
      <p>I attempted to follow responsive design practices wherever possible to allow the website to be usable 
         on both desktop and mobile screens. This was challenging, especially for maintaining the functionalities 
         of a desktop environment on mobile devices.</p>
         
      <h3>Dynamic UI</h3>
      <p>The WindowManagerRedux.jsx component uses React hooks and Redux to dynamically display the currently open windows, 
         making it a centralized control panel for the app.</p>
         
      <h3>Best Practices</h3>
      <p>Consistent naming conventions, modular design, and the use of functional components with hooks 
         are some of the best practices followed in this project.</p>
         
      <h3>Commenting and Documentation</h3>
      <p>Inline comments and modular organization make the codebase easy to navigate, 
         significantly easing the process for future updates or team collaborations.</p>
         
      <h3>CSS Styling</h3>
      <p>Each component has its associated CSS file, ensuring that styles are compartmentalized and easily managed.</p>
    </div>
  );
};

export default AlexOSAppInfo;