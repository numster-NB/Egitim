import React from 'react'
import {Button, MenuItem} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import ButtonAppBarCollapse from './ButtonAppBarCollapse'

const styles = theme=>({
    root: {
        position: "absolute",
        right: 0
      },
      buttonBar: {
        [theme.breakpoints.down("xs")]: {
          display: "none"
        },
        margin: "10px",
        paddingLeft: "16px",
        
        
      }
})

const AppBarCollapse = (props) => {
    const {classes} = props
    return (
        <div className={classes.root} >
            <ButtonAppBarCollapse>
                <MenuItem>Login</MenuItem>
                <MenuItem>SıgnUp</MenuItem>
            </ButtonAppBarCollapse>
            <div className={classes.buttonBar} id="appbar-collapse" >
            <Button color="inherit">Login</Button>
            <Button color="inherit">Signup</Button>
            </div>
        </div>
    )
}

export default withStyles(styles)(AppBarCollapse);
