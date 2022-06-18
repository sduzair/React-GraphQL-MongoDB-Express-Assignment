import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App></App>
  </Provider>
)