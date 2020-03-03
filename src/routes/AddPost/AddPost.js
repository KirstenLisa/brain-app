import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AppContext from '../../AppContext';
import ValidationError from '../../components/ValidationError';
import placeholder_pic from '../../images/alpaka_dancing.jpg';
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


    uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').value = url;
            document.getElementById('image-url').value = url;
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
    getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            this.uploadFile(file, response.signedRequest, response.url);
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
    initUpload(){
      const files = document.getElementById('file-input').files;
      const file = files[0];
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
      console.log(userId);

      const newPost = {
        post_id: uuid(),
        user_id: userId,
        content: content.value,
        date: new Date(),
      };
      this.context.addPost(newPost);
      this.formRef.reset();
    
    }

    render() {

    
    return (
      <section className='add-post-section'>
        
        <input 
        type="file" 
        id="file-input"/>
        <p id="status">Please select a file</p>
        <img 
          id="preview" 
          src={placeholder_pic}
          value='/images/alpaka_dancing.jpg'></img>

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
              onChange={this.initUpload}
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
  