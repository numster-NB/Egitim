import React from 'react';
import ReactDOM from 'react-dom';
import IndexComponent from './IndexComponent';
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  typography:{
    fontFamily: ["Cabin", "sans-serif"]
    
  }
});

const history = createBrowserHistory();

ReactDOM.render(

  <ThemeProvider theme={theme}>
    <Router history={history} >
     <IndexComponent />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
