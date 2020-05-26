import React, { Component } from 'react'
import { TextField,Button,List,ListItem,ListItemText,IconButton,Tooltip,Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {Link} from 'react-router-dom';



const useStyles=(theme=>({
    root:{
        
    },
    paper:{
        display:'flex',
        flexDirection:'column',
        alignItems:'space-between',
        margin:'20px'
        
    },
    inner:{
        marginTop: theme.spacing(3),
        display:'flex',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    dlt:{
        color: theme.palette.error.dark,
        
    },
    list:{
        display:'flex',
        justifyContent:'space-between'

    },
    listItem:{
        
        borderBottom:'1px solid black'

    },
    form:{
        
        display:'flex',
        justifyContent: 'space-around',
        
    }
}))

class TodoComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            items:[],
            currentItem:{
                text:'',
                id:''
            }
            
        }
        this.handleInput=this.handleInput.bind(this);
        this.addItem=this.addItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);

        
    }
    
    handleInput(e){
        this.setState({
            currentItem:{
                text:e.target.value,
                id: Date.now()
            }
        })
    }
    async addItem(e){
        e.preventDefault();
        const newItem=this.state.currentItem;
        console.log(newItem)

        const response = await axios.post("http://localhost:3004/items",newItem)
        
        this.setState({
            items: [...this.state.items, response.data],
            currentItem:{
                text:'',
                id:''
            }
        })
        
    }
    async deleteItem(id){
       const filteredItems=this.state.items.filter(item=>item.id!==id);
        await axios.delete(`http://localhost:3004/items/${id}`)
       this.setState({
           items:filteredItems
       })
       
    }
    //! await, async olmadan kullanılamaz.
    componentDidMount = async () => {
        const response= await axios.get("http://localhost:3004/items");
        this.setState({
            items:response.data
        })
        
    }
    
    render() {
        const {classes} = this.props
        return (
                <Paper elevation={20}  className={classes.root} >
                    <div className={classes.paper}>
                         <div className={classes.inner}>
                         <form className={classes.form}  onSubmit={this.addItem} style={{width:'100%'}}>
                            <TextField
                            size="small"
                            color="secondary"
                            variant="outlined"
                            placeholder="Bir Görev Giriniz..."
                            value={this.state.currentItem.text}
                            onChange={this.handleInput}
                            style={{width:'75%'}}
                            >
                            </TextField>
                            
                            
                                <Button  type="submit" color="secondary" variant="contained">
                                    Add
                                </Button>
                                
                            </form>
                            
                            
                       
                         </div>
                         <List>
                         {this.state.items.map(item=>{
                     return(
                         <ListItem key={item.id}>
                             
                             <ListItemText
                             
                             primary={item.text} />
                                 
                                 <Button component={Link} target="_blank" to={`/details/${item.id}`} size="small" color="primary" variant="outlined">Details</Button>
                                 <Tooltip title="Delete">
                                     <IconButton onClick={()=> this.deleteItem(item.id)}  className={classes.dlt}>
                                         <DeleteIcon  />
                                     </IconButton>
                                 </Tooltip>
                                  
                         </ListItem>
                     )
                 })}
             </List>
                    
                    
                    </div>
                </Paper>
                
                    
            
        )
    }
}

export default withStyles(useStyles)(TodoComponent);