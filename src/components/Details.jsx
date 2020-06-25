import React, { Component } from 'react'
import { Container,ExpansionPanel,ExpansionPanelSummary,Typography,ExpansionPanelDetails,Button,Paper,Tooltip,CircularProgress,TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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

    constructor(props){
        super(props);
        this.state={
            alertMes:undefined,
            alertMesErr:undefined,
            latitude:undefined,
            longitude:undefined,
            items:[],
            currentItem:{
                head:"",
                text:"",
                id: "",
                itemId:""
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

    handleText=(e)=>{
        this.setState({
            currentItem:{
                head:e.target.value,
                text:this.state.currentItem.text,
                id: this.state.currentItem.id,
                itemId:this.props.match.params.id
            }
        })
        const head = this.state.currentItem.head
        console.log(head)
    } 
    handleInput = (e)=>{
        var header=e.target.parentElement.elements.header.value
        this.setState({
            currentItem:{

                head:header,
                text:e.target.value,
                id: Date.now(),
                itemId:this.props.match.params.id
            }
        })
        console.log(this.state.currentItem)
    }
    addItem = async (e)=>{
        e.preventDefault();
        const newItem =this.state.currentItem;

        const response= await axios.post("http://localhost:3004/details",newItem)

        if(newItem.text===''){
            alert('Hata')
        }
        else if(newItem.head===''){
            e.target.elements.header.style.backgroundColor='#ff0000';
        }else{
            this.setState({
                items:[...this.state.items, response.data],
                currentItem:{
                    head:"",
                    text:"",    
                    id:"",
                    itemId:""
                }
            })
        }
       
       
        

     } 
     componentDidMount= async () => {
         const response = await axios.get("http://localhost:3004/details")
         console.log(response.data)
         const dataItem= response.data.filter(item=>item.itemId===this.props.match.params.id)
         console.log(dataItem)
         this.setState({
             items:dataItem
         })
     }
     
      //! Bu şekildede yapabilirsin sadece form submit edildiğinde bana daha pratik geldi.(Bunu yaptığın zaman elementlerin value attributelarını yazmadığına emin ol.)
        /* addItem=(e)=>{
            e.preventDefault();

            var item={
                head:e.target.elements.header.value,
                text:e.target.elements.detail.value,
                id:Date.now()
            }
            
            this.setState({
                items:[...this.state.items,item]
            })
            e.target.elements.header.value="";
            e.target.elements.detail.value="";

        } */
    
    deleteItem= async (id)=>{
        const items = this.state.items.filter(item=>item.id!==id);
        await axios.delete(`http://localhost:3004/details/${id}`)
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
                           console.log(item.head)
                           
                           return(
                               
                               <ExpansionPanel  key={item.id} >
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                           
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            
                            <Typography> {item.head} </Typography>
                            
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
                   <TextField 
                   color="primary" 
                   variant="filled" 
                   name="header" 
                   style={{backgroundColor:'#fff'}}
                   placeholder="Detay Başlığını Giriniz.."
                   margin="normal"
                   size="small"
                   onChange={this.handleText}
                   value={this.state.currentItem.head}
                   onFocus={(e)=>{e.target.style.backgroundColor="#fff"}}
                   >
                   </TextField>
                   
                   
                    <textarea
                    onChange={this.handleInput}
                    value={this.state.currentItem.text} //! Bunun mantığı state içerisinde bunun değeri bulunur.Biz bir eleman eklediğimiz zaten state içerisinde text değerini boş olarak güncelliyoruz ve burasıda tekrar boş oluyor.
                    style={{minWidth:'80%', minHeight:'100px'}} 
                    placeholder="Detay Ekleyin.."
                    name="detail"
                    onFocus={(e)=>{e.target.style.backgroundColor="#fff"}}

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