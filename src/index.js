import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.css"
import Field from './components/Field';
import Controls from './components/Controls';
import Score from './components/Score';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Field></Field>
    <Score></Score>
    <Controls></Controls>
  </React.StrictMode>
);