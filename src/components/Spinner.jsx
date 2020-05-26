import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme=>({
    popup:{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    inner:{
        position: 'absolute',
        top: '10%',
        left: '35%',
        right: '35%',
        bottom: '10%',
        margin: 'auto',
        borderRadius: '8px',
        display:'flex',
        
    },
    circ:{
        margin:'auto'
        
    }
    
})




 class Spinner extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.popup} style={{zIndex:'99999'}}>
                <div className={classes.inner}  >
                    
                        <CircularProgress thickness="2.6" size="12rem" className={classes.circ}   color="secondary" />
                    
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(Spinner);