import React, { Component } from 'react'
import { Container,ExpansionPanel,ExpansionPanelSummary,Typography,ExpansionPanelDetails,Button,Paper,Tooltip,CircularProgress } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = theme=>({
    "@global":{
        body:{
            background: "linear-gradient(to right, #3a6186, #89253e)",
        }
    },
    root:{
        width:'100%',
        marginTop:'30px'
    },
    root2:{
        
        marginTop:'30px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:'200px'
        
    },
    form:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        height:'200px'
    },
    delete:{
        position:'absolute', 
        right:'10px',
        top:'10px',
        cursor:'pointer',
        color:theme.palette.error.dark
    }
})


class Details extends Component {

    constructor(){
        super();
        this.state={
            alertMes:undefined,
            alertMesErr:undefined,
            latitude:undefined,
            longitude:undefined,
            items:[],
            currentItem:{
                text:"",
                id: ""
            },
            circProg:false
            
        }
    }
    getLocation=()=>{
        this.setState({circProg:true})
        setTimeout(()=>{
            this.setState({
                circProg:false
            })
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(this.showPosition)
            }else{
                this.setState({
                    alertMesErr:true
                })
            }
        },2000)
        
    }
    showPosition=(position)=>{
        this.setState({
            alertMes:true,
            longitude:position.coords.longitude,
            latitude:position.coords.latitude
        })
    }
    handleInput = (e)=>{
        this.setState({
            currentItem:{
                text:e.target.value,
                id: Date.now()
            }
        })
    }
    addItem = (e)=>{
        e.preventDefault();
        const newItem =this.state.currentItem;

        this.setState({
            items:[...this.state.items, newItem],
            currentItem:{
                text:"",
                id:""
            }
        })

    }
    deleteItem=(id)=>{
        const items = this.state.items.filter(item=>item.id!==id);
        this.setState({
            items:items
        })
    }
    render() {
        const {classes}=this.props;
        console.log(this.props.match.params.id)
        return (
            <Container maxWidth="sm" >
            
                <div className={classes.root}>

                   {
                       this.state.items.map((item,index)=>{
                           console.log(index)
                           return(
                               
                               <ExpansionPanel  key={item.id} >
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                           
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            
                            <Typography> {`Detail ${index+1}`} </Typography>
                            
                            </ExpansionPanelSummary>
                            
                            <ExpansionPanelDetails style={{position:'relative'}}>
                                <Typography>
                               {item.text}
                                </Typography>
                                    <Tooltip title="Detayı Sil">
                                        <DeleteIcon className={classes.delete} onClick={()=>this.deleteItem(item.id)}  />
                                    </Tooltip>
                                    
                            </ExpansionPanelDetails>
                            
                            </ExpansionPanel>
                               
                               
                            
                           )
                       })
                   }
                    
                <form onSubmit={this.addItem} className={classes.form}>

                    <textarea
                    onChange={this.handleInput}
                    value={this.state.currentItem.text}
                    style={{minWidth:'80%', minHeight:'100px'}} 
                    placeholder="Detay Ekleyin.."
                    >
                    </textarea>
                    <Button type="submit"  variant="contained" color="primary">Detay Ekle</Button>
                </form>
                </div>
                <Paper  className={classes.root2} elevation={8} >
                <div style={{textAlign:'center'}}>
                <Typography variant="h6" >Koordinat Bilgilerini Getirmek İçin Tıklayınız.</Typography>
                    <Button 
                    onClick={this.getLocation}
                    variant="contained" 
                    color="primary" 
                    disabled={this.state.circProg}

                    >
                            {this.state.circProg && <CircularProgress size="20px" color="secondary" />}
                            {this.state.circProg && <Typography style={{marginLeft:'5px'}} variant="body1">Loading</Typography> }
                            {!this.state.circProg && <Typography variant="body1">Get Location</Typography> }
                            
                    </Button>
                </div>
                    

                    <div>
                    
                      {
                        this.state.alertMes ? <Alert severity="success"> {`latitude: ${this.state.latitude} - longitude: ${this.state.longitude}`} </Alert> 
                        : null
                       }
                       {
                           this.state.alertMesErr ? <Alert severity="error">Tarayıcınız desteklememektedir.</Alert>
                           : null
                       }
                    </div>
                   


                </Paper>
                       
                        
                       
                    
                
            </Container>
        )
    }
}
export default withStyles(useStyles)(Details);