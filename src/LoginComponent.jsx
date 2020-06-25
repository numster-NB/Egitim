import React, { Component } from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import Copyright from './Copyright';
import Box from '@material-ui/core/Box';
import Popup from './components/Popup';
import Alert from '@material-ui/lab/Alert';
import {validation} from './components/Users';
import Spinner from './components/Spinner';
import back from './components/img/back.jpg';

const useStyles = theme =>({
    "@global": {
		body: {
			backgroundImage: `url(${back})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
			
		},
		
		
	},
    paper:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
        
    },
    avatar:{
        margin: theme.spacing(1),
        
    },
    form:{
        width: '100%',
        marginTop: theme.spacing(1)

    },
    submit:{
        margin: theme.spacing(3,0,2)
    },
    root:{
        display:'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
          }
    },
    circ:{
        margin: 'auto'
    }
});

 class IndexComponent extends Component {

   

    constructor(){
        super();
        this.state={
            err: false,
            loading: false,
            showPopup: false,
            disabled:false
        };
    }
    
    isEmail=(email)=>{
        var pattern= /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
        return pattern.test(email)
    }
    login= (e) =>{
        e.preventDefault();
        var email= e.target.elements.email.value;
        var password= e.target.elements.password.value;

       var degerler=validation.User(email,password);


        if(degerler){
            this.fetchData();
            
            
            
            this.setState({
                disabled:true
            })
            
            
            setTimeout(()=>{
                this.props.history.push('/welcome/user');
            },3000)
            


        }else if(email == ''){
            e.target.elements.email.style.backgroundColor='#ff0000';
        }else if(password == ''){
            e.target.elements.password.style.backgroundColor='#ff0000';
        }
        else if(this.isEmail(e.target.elements.email.value)==false){
            this.setState({
                err: !this.state.err
            })
        }
        else{
            this.togglePopup();
        }
    }
    fetchData = () =>{
        this.setState({
            loading: true
        });
        
        setTimeout(()=>{
            this.setState({loading:false})
        },3000)
    }
    onFocusEvent= (e)=>{
        e.target.style.backgroundColor='#fff';
        
    }
    
    togglePopup = () => {  
        this.setState({  
             showPopup: !this.state.showPopup
        });  
         }  
    render() {
        const {loading}=this.state;
        const {err}=this.state;
       const {classes}=this.props;
     
        return (
            
            <Container  component="main" maxWidth="xs" >
                
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" color="secondary"  >LOGIN</Typography>
                    
                        <VpnKeyIcon fontSize="large" color="secondary" className={classes.avatar} />
                    
                    {err && <Alert variant="filled" severity="error"  >Please Check Email Field</Alert> }
                    <form className={classes.form} noValidate method="post" onSubmit={this.login} >
                        <TextField 
                        
                        color="secondary"
                        variant="filled"
                        margin="normal"
                        required 
                        fullWidth 
                        onFocus={this.onFocusEvent}
                        name="email"
                        label="Email"
                        id="email"
                        autoComplete="email"
                        style={{backgroundColor:'#fff'}}
                        disabled={this.state.disabled}
                        />
                        <TextField
                        color="secondary"
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        onFocus={this.onFocusEvent}
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        style={{backgroundColor:'#fff'}}
                        disabled={this.state.disabled}
                        />
                        
                        
                        <Button
                        
                         className={classes.submit} id="btn" disabled={this.state.disabled} fullWidth type="submit" variant="contained"  color="secondary">
                         LOGIN
                         </Button>
                         
                         
                       
                    </form>
                   
                    
                </div>
                <Box mt={7} >
                    <Copyright />
                </Box>
                {this.state.showPopup &&  
                    <Popup  
                              text='Wrong email or Password!' 
                              text2='Please correctly enter your email and password' 
                              closePopup={this.togglePopup}  
                    />   
                    }
                    { loading && <Spinner thickness="2.6" size="12rem"  /> }
            </Container>
            
            
            
        )
    }
}
export default withStyles(useStyles)(IndexComponent)
