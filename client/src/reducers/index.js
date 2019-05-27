import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import budget from './budget';

export default combineReducers({ alert, auth, budget });
