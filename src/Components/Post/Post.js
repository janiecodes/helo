import axios from 'axios';
import React, {Component} from 'react';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture:''
        }
    }

    //get post information
    componentDidMount = () => {
      axios.get(`/api/post/${this.props.match.params.id}`)
      .then(res => this.setState({...res.data}))
      .catch(error => console.log(error))
    }

    
    render() {
      const {title, content, author, authorPicture} = this.state
      return (
        <div className='post-component'>
          <h1 className='post-title'>{title}</h1>
          <div className='post-author'>{author}</div>
          <div className='post-authorPicture'>{authorPicture}</div>
          <div className='post-content'>{content}</div>
        </div>
      )
    }
  }

export default Post