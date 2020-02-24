import React from 'react';
import ValidationError from '../../components/ValidationError';
import AppContext from '../../AppContext';
import './EditPost.css';

class EditHomework extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      content: { value: '', touched: false },
      post_pic: { value: '' },
    };
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    const currentPost = this.context.postList.filter(post => post.post_id == postId);
    console.log(currentPost);
    this.setState({
        content: currentPost[0].content,
        post_pic: currentPost[0].post_pic
    })
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
    const { post_id, user_id } = this.props.match.params;

    const { content, profile_pic } = e.target;

    const updatedPost = {
      post_id: post_id,
      user_id: user_id,
      content: content.value,
      profile_pic: profile_pic.value
    };

    if (this.validateForm()) {
      return null;
    }
    if (this.validateContent()) {
      return null;
    }
  }

  render() {

    return (
      <form className='edit-post-form' onSubmit={e => this.handleSubmit(e)}>
        <div className='edit-post-error' role='alert'>
          {/* {error && <p>{error.message}</p>} */}
        </div>
        <h2>Not happy with your post? Edit it!</h2>

        <div className='edit-pic'>
          <label htmlFor=''>Pic</label>
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

          <button type='submit' className='submitEditHomework'>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default EditHomework;
