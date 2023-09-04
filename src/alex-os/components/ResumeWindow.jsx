import React from 'react';
import './ResumeWindow.css'

const ResumeWindow = () => {
  return (
    <div className="resume">
      <h1>Resume</h1>
      
      <h2>Personal Information</h2>
      <ul>
        <li>Name: Alex Davis</li>
        <li>Email: william.alex.davis@gmail.com</li>
        <li><a href="https://linkedin.com/in/william-davis-webdev" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://github.com/slothcodes" target="_blank" rel="noopener noreferrer">Github</a></li>
      </ul>
      
      <h2>Summary</h2>
      <p>Versatile professional with a strong foundation in traditional web and React development, backed by 9 years of experience in freelance SEO writing. Offering a unique blend of technical and content creation skills to deliver complete web solutions.</p>
      
      <h2>Education</h2>
      <p>Bachelor's Degree in Political Science, Jacksonville State University, 2009</p>

      <h2>Skills</h2>
      <ul>
        <li>Front-End Development: React, JavaScript, CSS, HTML5</li>
        <li>Back-End Development: Node.js, Express</li>
        <li>Database Management: MySQL</li>
        <li>API Integration: RESTful APIs</li>
        <li>Miscellaneous: Git, Python</li>
        <li>SEO Writing</li>
        <li>Responsive Web Development</li>
      </ul>

      <h2>Professional Experience</h2>
      <h3>Freelance SEO Writer (9 years)</h3>
      <ul>
        <li>Created SEO-focused content strategies for clients across various industries, expanding reach and increasing engagement.</li>
        <li>Coordinated with development and editorial teams to create visually appealing and content-rich web pages.</li>
        <li>Performed rigorous market analysis to identify content opportunities and strategies.</li>
        <li>Delivered high-volumes of content while maintaining stringent quality and editorial standards.</li>
      </ul>
      
      <h2>Software Projects</h2>
      <h3>Writer's Assistant</h3>
      <ul>
        <li>Developed a React application that provided instant suggestions for keyword-centric headlines and drafts, improving article quality and reducing turnaround time.</li>
        <li>Utilized Redux for comprehensive state management, using slices for modularity. </li>
        <li>Use OpenAi API for data retrieval.</li>
        <li>Achieved responsive design, ensuring compatibility across desktop, tablet, and mobile platforms.</li>
      </ul>

      <h3>News Reader</h3>
      <ul>
        <li>Created a full-stack news aggregation service using ReactJS, Express.js, and MySQL.</li>
        <li>Built RESTful APIs using Express.js for backend data storage and retrieval in MySQL.</li>
        <li>Used Material UI components for dropdowns, buttons, and form controls.</li>
        <li>Implemented news categorization and pagination features, enhancing user navigation and experience.</li>
      </ul>

      <h3>Personal Server</h3>
      <ul>
        <li>Developed an Express.js-based backend for my portfolio, focusing on modular design.</li>
        <li>Integrated OpenAI GPT-3 for automated content creation and manipulation.</li>
        <li>Created database functions for collecting and managing news stories.</li>
        <li>Implemented rate-limiting and optimized API calls for efficient performance.</li>
        <li>Set up endpoints to serve static React files and handle dynamic API requests.</li>
      </ul>

      <h2>References</h2>
      <p>Available upon request.</p>
    </div>
  );
}

export default ResumeWindow;
