import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

class PostList extends Component {

    render() {
      const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
      const userId = currentUser.id;
      const postList = this.props.postList.map((post, i) => 
                        <li className='post-list-item' id={post.post_id} key={i}>
                          <Link to={`/posts/${post.post_id}`}>
                          {post.content}
                          </Link>
                          </li>);


  return (
    <div className="post-links">
      <h4 className='post-list-headline'>
        Recent Posts
      </h4>
      {postList}
    </div>
  );
};
}

export default PostList;