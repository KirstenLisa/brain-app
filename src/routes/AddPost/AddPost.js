import React, { Component } from 'react';
import { withRouter } from 'react-router';
import config from '../../config';
import PostsApiService from '../../services/posts-api-service';
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
        post_pic: { value: ''},
        error: null
      };
    }

    componentDidMount() {
      this.setState({post_pic: { value: '/images/dulli_mud.jpeg' }});
    }


    uploadFile = (file, signedRequest, url) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').value = url;
            document.getElementById('image-url').src = url;
            this.setState({post_pic: { value: url }});
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }

    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    getSignedRequest = (file) => {
      console.log(file.name);
      console.log(file);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${config.API_ENDPOINT}/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            this.uploadFile(file, response.signedRequest, response.url);
            console.log(response.url);
            this.setState({post_pic: { value: 'response.url' }});
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }

    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    initUpload = () => {
      const files = document.getElementById('file-input').files;
      const file = files[0];
      console.log(file);
      if(file == null){
        return alert('No file selected.');
      }
      this.getSignedRequest(file);
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

      const newPost = {
        post_id: uuid(),
        user_id: userId,
        content: content.value,
        post_pic: this.state.post_pic.value,
        date: new Date(),
      };
      console.log(newPost);

      PostsApiService.addPost(newPost)
        .then(this.context.addPost(newPost))
        .then(this.formRef.reset())
        .catch(this.context.setError);
    }

    render() {

    
    return (
      <section className='add-post-section'>
        
        <input 
        type='file' 
        id='file-input'
        onChange={this.initUpload}/>
        <p id="status">Please select a file</p>
        <p>{this.state.post_pic.value}</p>
        <img 
          id='preview'
          alt='preview' 
          src={this.state.post_pic.value}
          value={this.state.post_pic.value}></img>

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
            <input 
              type='hidden' 
              id='image-url' 
              name='image-url' 
              value='/images/alpaka_dancing.jpg'
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
  