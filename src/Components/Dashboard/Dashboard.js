import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            post: [],
            myPost: true,
            loading: true
        }
    }



    render() {
        let posts = this.state.posts.map((post) => {
          return <Link to={`/post/${post.post_id}`} key={post.post_id}>
            <h1>{post.title}</h1>
            <p>by {post.author_username}</p>
            <img src={post.profile_pic} alt='author'/>
          </Link>
        })
        return (
          <div className='dashboard-component'>
            <input className="search" value={this.state.search} onChange={e => this.setState({search: e.target.value})} placeholder="Search by Title"/>
            <button className="reset-button" onClick={this.reset}>Reset</button>
          </div>
        );
    }
  }

function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}
export default connect(mapStateToProps)(Dashboard);