import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 1. import from react-redux and redux
import {createStore ,} from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// 2. create user reducer function


// 3. combine multiple reducer


// 4. make a store
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
