import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from './../../ducks/reducer'

function Nav(props) {
    if(props.location.pathname !== '/'){
        return (
            <div className='nav-component'>
                <div className='nav-buttons'>
                   <Link to='/dashboard'></Link>
                   <Link to='/new'></Link>  
                </div>
                <div className='logout-button'>
                <Link to='/' onClick={props.logoutUser}></Link>
                </div>
            </div>
            )
    }else {
        return null
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {logoutUser})(withRouter(Nav));
// export default withRouter(connect(mapStateToProps, {logoutUser}))(Nav)