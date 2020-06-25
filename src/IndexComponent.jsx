import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import Details from './components/Details';
import Profiles from './components/Profiles';
import Pokemon from './components/Pokemon/Pokemon';
import Pokedex from './components/Pokemon/Pokedex'

export default class IndexComponent extends Component {
    render() {
        return (
            
                <Switch>
                    <Route exact path="/" component={LoginComponent}/> 
                    <Route exact path="/welcome/:username" component={WelcomeComponent}/> 
                    <Route exact path="/details/:id" component={Details} />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/pokemon/:id" component={Pokemon} />
                    <Route exact path="/pokedex" component={Pokedex} />
                 </Switch>
            
        )
    }
}
