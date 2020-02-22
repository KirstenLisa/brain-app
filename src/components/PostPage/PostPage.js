import React, { Component } from 'react';
import { format } from 'date-fns';
import AppContext from '../../AppContext';

class PostPage extends Component {

    static contextType = AppContext;

    handlePostDelete = e => {
        e.preventDefault();
        console.log('delete post');
        const { postId } = this.props.match.params;
        this.context.deletePost(postId);
        this.props.history.push(`/dashboard/1`);
    }

    render() {

        const { postId } = this.props.match.params;
        const posts = this.context.postList;
        const currentPost = posts.filter(post => post.post_id == postId);
        console.log(currentPost);

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
                        onClick={this.handlePostDelete}>
                        Delete
                    </button>
                    <button>
                        Add Post
                    </button>
                </div>
            </div>
        );
    }


};

export default PostPage;