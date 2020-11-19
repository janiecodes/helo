import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser, loginUser, getMe} from './../../ducks/reducer';
import axios from 'axios';
class Nav extends Component {
    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    //     this.props.getMe();
    // }

    // componentDidMount(){
    //     axios
    //       .get('/api/auth/me')
    //       .then(res => {this.props.loginUser(res.data)})
    //       .catch(error => console.log(error))
    // }

    componentDidMount(){
        this.props.getMe();
      }

    logoutUser = () => {
        axios
          .post('/api/auth/logout')
          .then(res => this.props.logoutUser())
          .catch(error => console.log(error))
    }
      
    render(){
        if(this.props.location.pathname !== '/'){
            return (
            <div className='nav-component'>
                <div className='nav-profile-pic'>{this.props.profilePic}</div>
                <div className='nav-username'>{this.props.username}</div>
                <div className='nav-buttons'>
                   <Link to='/dashboard'><p className='nav-home-button'>Home</p></Link>
                   <Link to='/new'><p className='nav-new-post-button'>New Post</p></Link>  
                </div>
                <div className='logout-button'>
                <Link to='/' onClick={this.logoutUser}><p>Logout</p></Link>
                </div>
            </div>
            )
        }else {
            return null
        }
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {logoutUser, loginUser, getMe})(withRouter(Nav));
// export default withRouter(connect(mapStateToProps, {logoutUser}))(Nav)