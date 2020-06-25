import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import '../App.css'
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
        
    },
    
})

const Modal = (props) =>{
    const {classes} = props;
    return ReactDOM.createPortal(
        <div className={classes.popup} style={{zIndex:'99999'}}>
        <div className={classes.inner}  >
            <div className={classes.circ}><i className="fas fa-circle-notch fa-spin fa-8x"></i></div>
                
            
        </div>
    </div>,
    document.querySelector('#modal')
    )
 
}

export default withStyles(useStyles)(Modal)