import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import TaskItem from './TaskItem';

it('renders without crashing', () => {
    const currentTask = [];
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TaskItem 
      currentTask={currentTask}/>
    </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});