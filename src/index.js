import React from 'react';
import AuthLogic from './service/authLogic';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore } from 'redux';
import App from './App';
import './components/css/style.css';
import rootReducer from './redux/rootReducer';
import '@fortawesome/fontawesome-free/js/all.js'
import 'react-quill/dist/quill.snow.css'
//이미지업로더 객체 생성
import ImageUploader from "./service/imageUploader";
import firebaseApp from './service/firebase';
import { setAuth } from './redux/userAuth/actions';
//////////////////////////////////
//리덕스 적용하기
const store = legacy_createStore(rootReducer);
//authLogic객체 생성
const authLogic = new AuthLogic(firebaseApp);
//store에 있는 초기상태정보 출력하기
store.dispatch(
  setAuth(authLogic.getUserAuth(),authLogic.getGoogleAuthProvider())
)
////////////////////////////////////////
//리덕스 추가 store생성
//createStore호출
const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <Provider store ={store}>
    <BrowserRouter>
    <App authLogic= {authLogic} imageUploader={imageUploader} />
    </BrowserRouter>
   </Provider>
  </>
);

