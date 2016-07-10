import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    componentDidMount() {
        // check user login status
        console.log('--- pathname', this.props)
        this.props.checkLogin(this.props.location.pathname);
    }
    handleLogOut() {
        this.props.logout();
    }
    render() {
        return (
            <div>
                <header>
                    <h3>App</h3>
                    {this.props.userInfo && this.props.userInfo.first &&
                    <p>user: {this.props.userInfo.first} {this.props.userInfo.last}</p>
                    }
                </header>
                <Link to='/' activeClassName='active'>Home</Link>
                {!this.props.userInfo.first &&
                <Link to='/signup' activeClassName='active'>Sign Up</Link>
                }
                {!this.props.userInfo.first &&
                <Link to='/login' activeClassName='active'>Log In</Link>
                }
                {this.props.userInfo.first &&
                <p onClick={this.handleLogOut}>Log Out</p>
                }
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;