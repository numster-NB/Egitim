import React, { Component } from 'react'
import {  Container,Typography, Grid, Paper, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


const useStyles=theme=>({

    "@global":{
        html:{
            scrollBehavior:'smooth'
        }
    },

    image:{
        border: '1px solid inherit',
        borderRadius:'50%'
    },
    list:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        textAlign:'center'
        
        
    },
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        background:'linear-gradient(to right,#D3959B,#BFE6BA)',
        height:'300px',
        
        transition:theme.transitions.create(
            ['opacity'],
            {duration:theme.transitions.duration.complex}
        ),
        '&:hover': {
            opacity:'0.9'
         },
         
    },
    share:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        
        
    },
    social:{
        color:'#0e153a',
        cursor:'pointer',
        transition: theme.transitions.create(
            ['color'],
            { duration: theme.transitions.duration.complex }
          ),
        '&:hover':{
            color:'#278ea5'
        }
    },
    btn:{
        position:'fixed',
        right:'20px',
        bottom:'30px'
    }
})




class Profiles extends Component {

    constructor(){
        super();
        this.state={
            
            results:[],
            bckToTop:false
        }
    }
    componentDidMount = async () =>{
        const response = await fetch("https://randomuser.me/api/?results=16");
        const profiles = await response.json();
        this.setState({
            results:[...profiles.results]
        })
        console.log(this.state.results)
    }
     scrollFunction=()=>{
        if (window.pageYOffset > 30) {
            this.setState({
                bckToTop:true
            })
        }else{
            this.setState({
                bckToTop:false
            })
        }
    }
    backToTop=()=>{
        window.scrollTo(0,0)
    }
    render() { 
        window.addEventListener('scroll',this.scrollFunction)
        const {classes}= this.props
        return (
                <Container  maxWidth="md">
                <Grid style={{width:'100%'}} container sm={12} justify="space-between" spacing={2} >
                    {
                        this.state.results.map((profile,index)=>{
                            return(
                                <Grid key={index} item sm={3}>
                                    <Paper className={classes.card} elevation={4} >
                                        
                                            <img className={classes.image}   src={profile.picture.large} alt="Picture"/>
                                            
                                            <div className={classes.list} >
                                                <Typography variant="body2">{`${profile.name.first} ${profile.name.last}`}</Typography>
                                                <Typography variant="body2">{profile.login.username}</Typography>
                                                <Typography variant="body2">{`${profile.location.city} - ${profile.location.country}`}</Typography>
                                                
                                            </div>
                                            <div style={{width:'50%'}}>
                                                <div className={classes.share}>
                                                <Typography className={classes.social} ><i class="fab fa-facebook-square fa-2x"></i></Typography>
                                                <Typography className={classes.social} ><i class="fab fa-instagram-square fa-2x"></i></Typography>
                                                <Typography className={classes.social} ><i class="fab fa-twitter-square fa-2x"></i></Typography>
                                                
                                                </div>
                                            </div>
                                        
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                   
                    {this.state.bckToTop && 
                    <Button size="large" variant="contained" onClick={this.backToTop}  className={classes.btn}  color="primary" >
                    
                        <i class="fas fa-arrow-up"></i>
                    </Button>
                    
                    }
                </Container>
            )
    }
}

export default withStyles(useStyles)(Profiles);