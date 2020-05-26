import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import Details from './components/Details';
 
export default class IndexComponent extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginComponent}/> 
                    <Route exact path="/welcome/:username" component={WelcomeComponent}/> 
                    <Route exact path="/details/:id" component={Details} />
                </Switch>
            </BrowserRouter>
        )
    }
}
