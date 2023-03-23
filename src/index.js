import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './components/css/style.css';
//이미지업로더 객체 생성
import ImageUploader from "./service/imageUploader";
//리덕스 추가 store생성
//createStore호출
const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
    <App imageUploader={imageUploader} />
    </BrowserRouter>
  </>
);

