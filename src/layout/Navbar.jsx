import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import {AppBar,Toolbar,Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';


const useStyles = theme=>({
    menuText:{
        textDecoration:'none',
        color:'#fff'
    }
})



 class Navbar extends Component {


    
    render() {
        const {classes}=this.props;
        return (
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography className={classes.menuText} variant="h6"  component={Link} to={`/welcome/user`} >
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withStyles(useStyles)(Navbar);