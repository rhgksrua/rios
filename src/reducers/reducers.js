import { combineReducers } from 'redux';
import {
    SET_USER_INFO,
    REMOVE_USER_INFO
} from '../actions/actions';

function riosReducer(state = {}, action) {
    switch(action.type) {
        case 'TEST':
            return state;
        case SET_USER_INFO:
            return state;
        default:
            return state;
    }
}

function userInfo(state = {}, action) {
    switch(action.type) {
        case SET_USER_INFO:
            return action.userInfo;
        case REMOVE_USER_INFO:
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    riosReducer,
    userInfo
});