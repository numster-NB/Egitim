import React from 'react';  
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = theme =>({
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
        top: '35%',
        left: '35%',
        right: '35%',
        bottom: '35%',
        margin: 'auto',
        backgroundColor:'white',
        borderRadius: '8px'
    },
    btn:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    typ:{
        marginTop: theme.spacing(2),
        
    }
});
class Popup extends React.Component {  
  render() { 
    const {classes}=this.props; 
return (  
<div className={classes.popup} style={{zIndex:'99999'}}>  
<div className={classes.inner}  >  
<Typography className={classes.typ} align="center" variant="h6"  color="error" >
{this.props.text}
</Typography> 
<Typography className={classes.typ} align="center" variant="body1"  color="textPrimary" >
{this.props.text2}
</Typography> 
<div className={classes.btn} >
<Button   variant="outlined" color="primary" onClick={this.props.closePopup}>Close</Button>  
</div>

</div>  
</div>  
);  
}  
}  

export default withStyles(useStyles)(Popup)