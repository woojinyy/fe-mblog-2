import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './components/css/style.css';
import ImageUploader from "./service/imageUploader";

const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
    <App imageUploader={imageUploader} />
    </BrowserRouter>
  </>
);

