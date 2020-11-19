import axios from 'axios';
import React, {Component} from 'react';

class Post extends Component {
  constructor(){
    super();
    this.state = {
        post: []
    }
}

    //get post information
    componentDidMount = () => {
      axios
      .get(`/api/post/${this.props.match.params.id}`)
      .then(res => this.setState({...res.data}))
      .catch(error => console.log(error))
    }
  
    render() {
      const {title, content, username, profile_pic, img} = this.state.post
      return (
        <div className='post-component'>
          <h1 className='post-title'>{title}</h1>
          <div className='post-author'>{username}</div>
          <img src={profile_pic} alt={`${username}'s profile`}/>
          <img src={img} className='post-author-img' alt={`${username}'s post`} />
          <div className='post-content'>{content}</div>
        </div>
      )
    }
  }

export default Post