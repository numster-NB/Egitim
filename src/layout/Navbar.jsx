import React, { useState } from 'react'
import {Link, NavLink } from 'react-router-dom';
import {AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemIcon,ListItemText,Divider} from '@material-ui/core';
import {withStyles,useTheme, duration} from '@material-ui/core/styles';
import {Menu} from '@material-ui/icons'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBarCollapse from './AppBarCollapse';
import ContactsIcon from '@material-ui/icons/Contacts';
import InfoIcon from '@material-ui/icons/Info';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth=240
const useStyles = theme=>({
    
    navTitle:{
        textDecoration:'none'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 2),
        
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
       
      
      },
      drawer:{
          width:drawerWidth,
          flexShrink: 0,
          
      },
      drawerPaper:{
          width:drawerWidth,
          backgroundColor:'#F0F0F0'
      }

})



 const Navbar=(props)=>  {
    const {classes}=props;
    const theme=useTheme();
    const [open,setOpen]=useState(false)
    
    const handleDrawer=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }
    const items=[

        {
            text:"Pokedex",
            url:"/pokedex",
            icon:<SportsEsportsIcon />
        },
        {
            text:"About",
            url:"/about",
            icon:<InfoIcon />
        },
        {
            text:"Contact",
            url:"/contact",
            icon:<ContactsIcon />
        }


    ]
        return (
            <div>
                <AppBar position="static"  >
                    <Toolbar>
                    <IconButton onClick={handleDrawer} edge="start" color="inherit">
                    <Menu />
                    </IconButton>
                    
                        <Typography className={classes.navTitle} color="inherit"  component={NavLink} to="/welcome/user" variant="h6" >
                            React Eğitim
                        </Typography>
                        
                        <AppBarCollapse />
                    </Toolbar>
                </AppBar>
                <Drawer
                anchor="left"
                open={open}
                onClose={handleClose}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                <div className={classes.drawerHeader}>
                <Typography variant="h6" style={{marginRight:'auto'}}  >React</Typography>
                    <IconButton onClick={handleClose} >
                       {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    
                </div>
                
                <Divider />
                <List>
                    {items.map((item,index)=>{
                        return(
                            <ListItem component={Link} button to={item.url} >
                                <ListItemIcon>{item.icon ? item.icon : null}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        )
                        
                        
                    })
                    
                    }

                </List>
                </Drawer>

            </div>
        )
    
}

export default withStyles(useStyles)(Navbar);