import React from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';
import { render } from 'react-dom';
import App from './app/App';
import  {BrowserRouter} from 'react-router-dom';
// import { combineReducers } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// import Homepage from './pages/home';
import * as serviceWorker from './serviceWorker';
const middleware = [ thunk ];

const store = createStore(
                    reducers,
                    applyMiddleware(...middleware));

render(
	<Provider store={store}>
	<React.Fragment>
	  <BrowserRouter>
	    <App />
	  </BrowserRouter>
	  </React.Fragment>
  </Provider>,
  document.getElementById('root'),
);

// ReactDOM.render(<Homepage />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
