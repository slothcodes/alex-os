import React from "react";

const AlexOSAppInfo = () => {
  return (
    <div className="alexOSAppInfo">
      <h1>AlexOS App</h1>
      
      <h2>Introduction</h2>
      <p>Welcome to the AlexOS App, a simulated desktop environment crafted to provide an immersive and interactive experience for visitors to my personal website.</p>
         
      <h2>Technical Highlights</h2>
      <h3>State Management with Redux</h3>
      <p>By employing Redux for state management, the app benefits from an intuitive and manageable codebase. This is particularly important for handling the state and positioning of the windows.</p>
         
      <h3>Component Architecture</h3>
      <p>The application is built on React and leans heavily on a modular design. AppWindow.jsx operates as the fundamental window component, while specialized versions like ResumeWindow.jsx are displayed within this window as child components.</p>
         
      <h3>Responsive Design</h3>
      <p>I've incorporated responsive design techniques to make the app usable across desktop and mobile platforms, a feat particularly challenging due to the complexities of mimicking a desktop environment on smaller screens.</p>
         
      <h3>Dynamic UI</h3>
      <p>WindowManagerRedux.jsx serves as a dynamic UI manager. By integrating React hooks and Redux, it can effectively display and control active windows.</p>
             
      <h3>CSS Styling</h3>
      <p>Each component is styled with its dedicated CSS file, making it easier to manage and compartmentalize styles across the app.</p>
    </div>
  );
};

export default AlexOSAppInfo;