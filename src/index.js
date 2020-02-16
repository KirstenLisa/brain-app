import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './AppContext'
import App from './App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <ContextProvider>
                <App />
        </ContextProvider>
    </BrowserRouter>, 
    document.getElementById('root'));