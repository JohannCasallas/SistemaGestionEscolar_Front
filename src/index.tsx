import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StudenRegistrationView from './components/views/StudentRegistration/studentRegistrationView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StudenRegistrationView />
  </React.StrictMode>
);

