import React from 'react';
import PostsApiService from '../../services/posts-api-service';
import ValidationError from '../../components/ValidationError';
import AppContext from '../../AppContext';
import './EditPost.css';

class EditPost extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      content: { value: '', touched: false },
      post_pic: ''
    };
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    const currentPost = this.context.postList.filter(post => post.post_id == postId);
    this.setState({
        content: { value: currentPost[0].content, touched: false },
        post_pic: currentPost[0].post_pic
    });
  }

  validateContent() {
    const { content } = this.state;
    if (content === undefined) {
      return 'Content is required';
    }
    if (content.value.length < 3) {
      return 'Content must be at least 3 characters long';
    }
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  validateForm() {
    if (this.validateContent()) {
      this.setState({ content: { touched: true } });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { postId } = this.props.match.params;
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const userId = currentUser.id;

    const { content } = e.target;

    const updatedPost = {
      post_id: postId,
      user_id: userId,
      content: content.value,
      post_pic: this.state.post_pic,
      date: new Date()
    };

    if (this.validateForm()) {
      return null;
    }
    if (this.validateContent()) {
      return null;
    }


    PostsApiService.updatePost(userId, postId, updatedPost)
      .then(this.context.updatePost(updatedPost))
      .then(this.props.history.push(`/dashboard`))
      .catch(this.context.setError);
  }

  render() {

    return (
      <form className='edit-post-form' onSubmit={e => this.handleSubmit(e)}>
        <div className='edit-post-error' role='alert'>
          {/* {error && <p>{error.message}</p>} */}
        </div>
        <h2>Not happy with your post? Edit it!</h2>

        <div className='post-pic-display'>
          <img className='post-pic-display' alt='post-pic' src={ this.state.post_pic }></img>
        </div>

        <div className='edit-content'>
          <label htmlFor=''>Content</label>
          <textarea
            type='text'
            className='edit_content_input'
            name='content'
            id='content'
            value={this.state.content.value}
            onChange={e => this.updateContent(e.target.value)}
            aria-required='true'
          />
        </div>

        <div className='content-error'>
          {this.state.content.touched && (
            <ValidationError
              message={this.validateContent()}
              id='contentError'
            />
          )}
        </div>

        <div className='update_button_group'>
          <button
            className='cancel-edit-post'
            type='button'
            onClick={() => this.props.history.goBack()}
          >
            Cancel
          </button>

          <button type='submit' className='edit-post'>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default EditPost;
