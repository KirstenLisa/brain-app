import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import PostPage from './PostPage';

it('renders without crashing', () => {
    const currentPost = [];
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PostPage 
            currentPost={currentPost}
            match= {
                {params: {postId: 1}}}
        />
    </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});