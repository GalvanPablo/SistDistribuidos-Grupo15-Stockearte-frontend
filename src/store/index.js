import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// REDUCERS
import authReducer from './reducers/auth.reducer';

const RootReducer = combineReducers({
    auth: authReducer
});

export default createStore(RootReducer, applyMiddleware(thunk));