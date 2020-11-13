import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';


class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            posts: [],
            myPosts: true,
        }
    }

    componentDidMount(){
        this.getUserPosts();
    }

    getUserPosts = () => {
        axios.get(`/api/posts/${this.props.userId}`)
        .then(res => this.setState({posts: res.data}))
        .catch(error => console.log(error));
    }

    reset = () => {
        axios.get(`/api/posts/${this.props.userId}`)
        .then(res => this.setState({posts: res.data, search: ''}))
        .catch(error => console.log(error));
    }

    render() {
        let posts = this.state.posts.map((post) => {
          return <Link to={`/posts/${post.post_id}`} 
                 key={post.post_id}>
                 <h1>{post.title}</h1>
                 <p>by {post.author_id}</p>
                 <img src={post.profile_pic} alt='author'/>
                </Link>
        })
        return (
          <div className='dashboard-component'>
            <input 
            className='search-box' 
            value={this.state.search} 
            onChange={e => this.setState({search: e.target.value})}/>
            
            <img className='magnifying-glass-img' alt='search-box' onClick={this.getUserPosts} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC'/>
            
            <button className="reset-button" onClick={this.reset}>Reset</button>
            
            <div>My Posts</div>
            {posts}
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