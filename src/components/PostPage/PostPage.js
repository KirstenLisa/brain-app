import React, { Component } from 'react';
import { format } from 'date-fns';
import PostsApiService from '../../services/posts-api-service';
import AppContext from '../../AppContext';
import './PostPage.css';

class PostPage extends Component {

    static contextType = AppContext;

    handlePostDelete = e => {
        e.preventDefault();
        const { userId, postId } = this.props.match.params;
        PostsApiService.deletePost(userId, postId)
            .then(this.context.deletePost(postId))
            .then(this.props.history.push(`/dashboard`))
            .catch(this.context.setError);  
    }

    editPost = e => {
        e.preventDefault();
        const { postId } = this.props.match.params;
        this.props.history.push(`/editpost/${postId}`)
    }

    render() {

        const { postId, userId } = this.props.match.params;
        const posts = this.context.postList;
        const currentPost = posts.filter(post => post.post_id == postId);

        return(
            <div className='post-page'>
                <img 
                className='post-pic'
                src={ currentPost[0].post_pic } 
                alt='post-pic'></img>
                <h4 className='post-page-content'>
                    {currentPost[0].content}
                </h4>
                {currentPost[0].date == undefined || currentPost[0].date == [] || currentPost[0].date == ''? 
                    (<p className='post-page-date'>no date</p>) 
                    :
                    (<p className='post-page-date'>{format(new Date(currentPost[0].date), 'do MMM yyyy')}</p>)}
                <div className='post-page-buttons'>
                    <button
                        className='delete-post-button'
                        onClick={this.handlePostDelete}>
                        Delete
                    </button>
                    <button 
                        className='edit-post-button'
                        onClick={this.editPost}
                        >
                            Edit
                        </button>
                        <button 
                        className='back-button'
                        onClick={() => this.props.history.push(`/dashboard`)}
                        >
                            Back
                        </button>
                   
                </div>
            </div>
        );
    }


};

export default PostPage;
