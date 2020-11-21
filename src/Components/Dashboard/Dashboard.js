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
            myPosts: true
        }
    }


    componentDidMount = () => {
      this.getUserPosts()
    }

    // componentDidMount = () => {
    //   const {myPosts, search} = this.state
    //   axios.get(`/api/posts?myPosts=${myPosts}&search=${search}`)
    //     .then(res => this.setState({posts: res.data}))
    //     .catch(error => console.log(error))
    // }

    getUserPosts = () => {
      const {myPosts, search} = this.state
      axios.get(`/api/posts?myPosts=${myPosts}&search=${search}`)
        .then(res => this.setState({posts: res.data}))
        .catch(error => console.log(error))
    }

    // getUserPosts = () => {
    //   const {myPosts, search} = this.state
    //   if(myPosts && search){
    //     return `/api/posts?myPosts=${myPosts}&search=${search}`
    //   }else if(myPosts && !search){
    //     return `/api/posts?myPosts=${myPosts}`
    //   }else if(!myPosts && search){
    //     return `/api/posts?search=${search}`
    //   }
    //   axios.get(`/api/posts`)
    //     .then(res => this.setState({posts: res.data}))
    //     .catch(error => console.log(error))
    // }

    //req.query - userspost(boolean) and search(string) IF/ELSE
    // {userposts && search} => title has search string
    // {!userposts && !search} => current user is not the author
    // {!userposts && search} => current user is not the author and title has search string
    // {userposts && !search} => all posts

    reset = () => { 
      axios
        .get(`/api/posts`)
        .then(res => this.setState({posts: res.data, search: ''}))
        .catch(error => console.log(error));
    }

    // reset = () => {
    //   const {myPosts, search} = this.state
    //   axios.get(`/api/posts?myPosts=${myPosts}&search=${search}`)
    //     .then(res => this.setState({posts: res.data, search: ''}))
    //     .catch(error => console.log(error))
    // }

    render() {
      
      const mappedPosts = this.state.posts.map((post) => {
        return <Link className='one-post' to={`/post/${post.post_id}`} 
                key={post.post_id}>
                <h1 className='post-tile'>{post.title}</h1>
                <p className='post-author'>by {post.author_id}</p>
                <img className='dashboard-profile-pic' src={post.profile_pic} alt='profile'/>
                </Link>
      })
      console.log(mappedPosts)
        return (
          <div className='dashboard-component'>
            <div className='dashboard-header'>
              <div className='dashboard-header-left'>
                <input 
                className='dashboard-search-box' 
                value={this.state.search} 
                onChange={e => this.setState({search: e.target.value})}
                placeholder='Search by Title'
                />

                <button onClick={this.getUserPosts} className='magnifying-glass-img'/>
            
                <button className="dashboard-reset-button" onClick={this.reset}>Reset</button>
              </div>

              <div className='dashboard-header-right'>
                <div className='dashboard-my-posts-title'>My Posts</div>
                <input className='dashboard-checkbox' type='checkbox' checked={this.state.myPosts} onChange={() => this.setState({myPosts: !this.state.myPosts}, this.getUserPosts)}/>
              </div>
            </div>
              <div className='dashboard-mapped-posts'>
              {mappedPosts}
              </div>
          </div>
  
        );
    }
  }

// function mapStateToProps(state) {
//   return {
//     userId: state.userId
//   }
// }
const mapStateToProps = state => state
export default connect(mapStateToProps)(Dashboard);

// export default Dashboard