import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import PostItem from './PostItem';

it('renders without crashing', () => {
    const currentPost = [];
    const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PostItem 
            currentPost={currentPost}/>
    </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});