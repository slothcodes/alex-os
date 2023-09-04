import { Provider } from 'react-redux';
import store from './redux/combinedStore';
import App from './App';
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  
);

//export default Root;
