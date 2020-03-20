import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Task from './Task';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Task />
    </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});