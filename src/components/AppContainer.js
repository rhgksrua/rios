import { connect } from 'react-redux';
import { checkLogInStatusFetch, logOutFetch } from '../actions/actions';
import App from './App';

const mapStateToProps = (state, props) => {
    const { userInfo } = state;
    return {
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkLogin: function(pathname) {
            dispatch(checkLogInStatusFetch(pathname));
        },
        logout: function() {
            dispatch(logOutFetch());
        }
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;