import React, {Component} from 'react';
import axios from 'axios';
import {loginUser} from './../../ducks/reducer';
import {connect} from 'react-redux';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
        //   newUser: false
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // toggleNewUser = () => {
    //     this.setState({
    //         newUser: !this.state.newUser
    //     })
    // }

    register = async (e) => {
        e.preventDefault();
        const {username, password} = this.state
        try {
            const user = await  axios.post('/api/auth/register', {username, password})
            this.props.loginUser(user.data);
            this.props.history.push('/dashboard');
          }
          catch(error){
              alert(error.response.request.response)
          }
      }
    
      login = async (e) => {
        e.preventDefault();
        const {username, password} = this.state
        try {
            const user = await axios.post('/api/auth/login', {username, password})
            this.props.loginUser(user.data);
            this.props.history.push('/dashboard')
        }
        catch(error){
            alert(error.response.request.response)
        }

      }

 render() {
    const {username, password} = this.state
    return (
    <div className='auth-component'>
        <div className='auth-username-input-box'>
            <p>Username:</p>
            <input 
                name='username'
                value={username}
                placeholder='Username'
                onChange={e => this.changeHandler(e)}
            />
        </div>
        <div className='auth-password-input-box'>
            <p>Password:</p>
            <input 
                name='password'
                value={password}
                placeholder='Password'
                onChange={e => this.changeHandler(e)}
            />
        </div>
        <div className='auth-buttons'>
            <button className='login-button' onClick={this.login}>Login</button>
            <button className='register-button' onClick={this.register}>Register</button>
        </div>
        

    </div>
    )
 }
}



export default connect(null, {loginUser})(Auth);