import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AlexOSAppInfo from './AlexOSAppInfo';
import NewsReaderAppInfo from './NewsReaderInfo';
import ArticleWriterAssistantInfo from './ArticleWriterAssistantInfo';
import './ProjectWindow.css';

const ProjectInfo = () => {
  const [selectedProject, setSelectedProject] = useState('1');

  const projects = [
    { id: 1, name: 'AlexOS'},
    { id: 2, name: 'News Reader'},
    { id: 3, name: 'Article Writer'},
  ];

  const handleChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const selectedProjectInfo = projects.find((project) => project.id === selectedProject);

  const getContent = (selectedID) => {
    switch (selectedID) {
      case 1:
        return <AlexOSAppInfo />;
      case 2:
        return <NewsReaderAppInfo />;
      case 3:
        return <ArticleWriterAssistantInfo />;
      default:
        return <AlexOSAppInfo />;
    }
  };


  return (
    <div className='projectWindow'>
      <h1>Select a Project to Learn More</h1>
      <Select
        className='projectSelect'
        variant='filled'
        value={selectedProject}
        onChange={handleChange}
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
      {getContent(selectedProject)}
      
    </div>
  );
};

export default ProjectInfo;
