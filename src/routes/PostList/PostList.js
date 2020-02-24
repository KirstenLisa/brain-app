import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

class PostList extends Component {

    render() {
      const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
      const userId = currentUser[0].id;
      const postList = this.props.postList.map((post, i) => 
                        <li className='post-list-item' id={post.post_id} key={i}>
                          <Link to={`/posts/${userId}/${post.post_id}`}>
                          {post.content}
                          </Link>
                          </li>);
      
      const postSorted = postList.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      console.log(postSorted);

// posts.sort(function(a,b){
//   // Turn your strings into dates, and then subtract them
//   // to get a value that is either negative, positive, or zero.
//   return new Date(b.date) - new Date(a.date);
// });


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