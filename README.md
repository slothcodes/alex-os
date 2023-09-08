# AlexOS App
# Introduction
Welcome to the AlexOS App, a simulated desktop environment crafted to provide an immersive and interactive experience for visitors to my personal website.

# Technical Highlights
State Management with Redux
By employing Redux for state management, the app benefits from an intuitive and manageable codebase. This is particularly important for handling the state and positioning of the windows.

# Component Architecture
The application is built on React and leans heavily on a modular design. AppWindow.jsx operates as the fundamental window component, while specialized versions like ResumeWindow.jsx are displayed within this window as child components.

# Responsive Design
I've incorporated responsive design techniques to make the app usable across desktop and mobile platforms, a feat particularly challenging due to the complexities of mimicking a desktop environment on smaller screens.

# Dynamic UI
WindowManagerRedux.jsx serves as a dynamic UI manager. By integrating React hooks and Redux, it can effectively display and control active windows.

# CSS Styling
Each component is styled with its dedicated CSS file, making it easier to manage and compartmentalize styles across the app.
