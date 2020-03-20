import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './PostItem.css';

const PostItem = (props) => {

    const postId = props.currentPost.post_id;
    const userId = props.userId;

    return(
        <div className='post-item'>
            <Link
                to={`/posts/${userId}/${postId}`}
                >
                <img 
                    className='post-pic'
                    src={ props.currentPost.post_pic } 
                    alt='post-pic'></img>
                </Link>
            
            <h4 className='post-item-headline'>
                {props.currentPost.content}
            </h4>
            {props.currentPost.date == undefined || props.currentPost.date == [] || props.currentPost.date == ''? 
              (<p>no date</p>)
              :
            (<p className='post-date'>
                {format(new Date(props.currentPost.date), 'do MMM yyyy')}
            </p>)}
           
        </div>
    )
};

export default PostItem;