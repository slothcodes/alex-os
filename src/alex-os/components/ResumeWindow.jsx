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
        <li>Phone: 303-332-3116</li>
        <li>LinkedIn: <a href="https://linkedin.com/in/william-davis-webdev" target="_blank" rel="noopener noreferrer">linkedin.com/in/william-davis-webdev</a></li>
        <li>GitHub: <a href="https://github.com/slothcodes" target="_blank" rel="noopener noreferrer">github.com/slothcodes</a></li>
      </ul>
      
      <h2>Summary</h2>
      <p>Experienced React Developer with a proven track record in web application development and a unique background in political science and SEO content creation. Bringing 9 years of experience as a freelancer to offer strong React, JavaScript, and API integration skills.</p>
      
      <h2>Education</h2>
      <p>Bachelor's Degree in Political Science, Jacksonville State University, 2009</p>

      <h2>Technical Skills</h2>
      <ul>
        <li>Front-End Development: React, JavaScript, CSS, HTML5</li>
        <li>Back-End Development: Node.js, Express</li>
        <li>Database Management: MySQL</li>
        <li>API Integration: RESTful APIs</li>
        <li>Miscellaneous: Git, Python</li>
      </ul>

      <h2>Other Skills</h2>
      <ul>
        <li>SEO Writing</li>
        <li>Responsive Web Development</li>
      </ul>

      <h2>Professional Experience</h2>
      <h3>Freelance SEO Writer (9 years)</h3>
      <ul>
        <li>Produced SEO-driven content for clients across multiple industries, reaching readers in diverse markets and industries.</li>
        <li>Collaborated with web developers and editors to create compelling content aligning with UX/UI design.</li>
        <li>Conducted comprehensive keyword research and competitive analysis to influence content strategy.</li>
        <li>Ensured high-quality and timely delivery.</li>
      </ul>
      
      <h2>Software Projects</h2>
      <h3>Writer's Assistant</h3>
      <ul>
        <li>Developed a React-based web application to assist writers in creating headlines and rough drafts for keyword-focused articles.</li>
        <li>Utilized Redux for efficient state management and integrated API for data retrieval.</li>
        <li>Achieved responsive design, ensuring compatibility across desktop, tablet, and mobile platforms.</li>
      </ul>

      <h3>News Reader</h3>
      <ul>
        <li>Designed and developed a news aggregation platform with React, Express, and MySQL to aggregate content from various news RSS feeds.</li>
        <li>Implemented news categorization and pagination features, enhancing user navigation and experience.</li>
      </ul>

      <h3>Personal Server</h3>
      <ul>
        <li>Created a back-end server with Node.js and Express to interact with OpenAI's GPT-3.5 API and manage news data storage.</li>
        <li>Implemented rate-limiting and optimized API calls for efficient performance.</li>
        <li>Set up endpoints to serve static React files and handle dynamic API requests.</li>
      </ul>

      <h2>References</h2>
      <p>Available upon request.</p>
    </div>
  );
}

export default ResumeWindow;
