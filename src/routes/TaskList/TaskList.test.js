import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import TaskList from './TaskList';

it('renders without crashing', () => {
    const tasks = [];
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TaskList 
      tasks={tasks}/>
    </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});