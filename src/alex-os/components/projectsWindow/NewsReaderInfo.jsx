import React from "react";

const NewsReaderAppInfo = () => {
  return (
    <div className="newsReaderAppInfo">
      <h1>RSS News App </h1>
      <a href="https://github.com/slothcodes/news-reader" target="_blank" rel="noopener noreferrer">See On GitHub</a>
      
      <h2>Introduction</h2>
      <p>Serving both as a full-stack example and a functional news aggregator, the News Reader App allows users to follow news topics. It uses React, API layers, and a MySQL database.</p>
      
      <h2>Technical Highlights</h2>
      <h3>Summary</h3>
      <p>This application features a frontend built with React and a backend using MySQL for data storage, accessed via an API. 
         The NewsReader.jsx component dynamically fetches data from the API based on user interactions while maintaining and 
         updating the app's state.</p>
         
      <h3>Frontend Components</h3>
      <ul>
        <li>Header.jsx: Manages category selection.</li>
        <li>Body.jsx: Handles the display of news stories and pagination.</li>
        <li>NewsCard.jsx: Represents individual news stories.</li>
      </ul>
      
      <h3>State Management</h3>
      <p>NewsReader.jsx and Body.jsx use React's useState hook for state management, offering a simple and efficient way 
         to handle component-level states.</p>
         
      <h3>Material-UI Integration</h3>
      <p>The app incorporates Material-UI components like Select and MenuItem for a polished UI. 
         This not only makes the website visually appealing but also standardizes the navigation UI across the app.</p>
         
      <h3>Modularity and Reusability</h3>
      <p>Each component is designed to be reusable and modular. This approach makes the codebase easier to maintain and extend. 
         Future plans include expanding the app's news sources and implementing searching and topic analysis to track trending stories.</p>
         
      <h3>API and Database Integration</h3>
      <p>The integration with the MySQL database is done via an API routed through an express server. 
         The app fetches the most recent stories and regularly removes the oldest ones to manage storage.</p>
         
      <h3>Styling and UX</h3>
      <p>With the aid of CSS modules, the app features a clean and intuitive user interface. 
         The responsive design ensures a seamless experience across various devices.</p>
    </div>
  );
};

export default NewsReaderAppInfo;