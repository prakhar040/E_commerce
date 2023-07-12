import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ProductProvider>
  <Router>
        <App />
      </Router>
      </ProductProvider>
      </React.StrictMode>

);
