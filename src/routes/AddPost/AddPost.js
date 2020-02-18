import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AppContext from '../../AppContext';
import ValidationError from '../../components/ValidationError';
import uuid from 'uuid/v4';
import './AddPost.css';


class AddPost extends Component {

    static contextType = AppContext;

    constructor(props) {
      super(props);
      this.state = {
        content: { value: '', touched: false },
        error: null
      };
    }

    updateContent(content) {
      this.setState({ content: { value: content, touched: true } });
    }

    validateContent() {
      const content = this.state.content.value;
      if (content === undefined) {
        return 'Content is required';
      }
      if (content.length < 4) {
        return 'Content must be at least 4 characters long';
      }
    }

    validateForm() {
      if (this.validateContent()) {
        this.setState({ content: { touched: true } });
      }
    }



    postSubmitHandler = e => {
      e.preventDefault();
      if (this.validateForm()) {
        return null;
      }
      console.log('submit post');

      const { content } = e.target;
      const userId = this.props.match.params.userId;
      console.log(userId);

      const newPost = {
        post_id: uuid(),
        user_id: userId,
        content: content.value,
        date: new Date(),
      };
      this.context.addPost(newPost);
      this.formRef.reset();
    
      //this.props.history.push(`dashboard/1`)
    }

    render() {

    
    return (
      <section className='add-post-section'>
          <form onSubmit={this.postSubmitHandler} className='add-post-form' ref={el => this.formRef = el}>
            <div className='add-content'>
              <label htmlFor='content'>Tell the world</label>
              <input
                className='add-content-input'
                onChange={e => this.updateContent(e.target.value)}
                type='text'
                id='content'
                value={this.state.value}
              />
            </div>
            <div className='post_error'>
              {this.state.content.touched && (
                <ValidationError message={this.validateContent()} id='fullNameError' />
              )}
            </div>
            <div className='upload-picture'>
              <label htmlFor='picture'>Post a Pic</label>
              <input
                className='add-pic-input'
                type='text'
                id='picture'
              />
            </div>
            <div className='post-form__actions'>
              <button 
                type='submit'
                className='add-post-button'>
                  Post
                  </button>
            </div>
          </form>
      </section>
    );
            }
        }
  
  export default withRouter(AddPost);
  