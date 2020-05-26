import React from 'react'
import {Typography,Card,CardHeader,CardContent} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import "../owfont-master/css/owfont-regular.css";



const useStyles = makeStyles({
    
    

    root:{
        
        height:'250px',
        width:'150px',
        background: 'linear-gradient(to right, #5C258D, #4389A2)',
        color:'#fff'
    },
    btn:{
        background: 'linear-gradient(to right, #870000, #190A05)'
    }
})


const WeatherMulti= (props) => {
    const classes=useStyles()
   
    
    return (
       
        <div>
            <Card style={{textAlign:'center'}}  className={classes.root}>
                        
            <CardHeader title={props.day}></CardHeader>
            <CardContent>
                <i className={`owf owf-${props.icon} owf-3x`}></i>
                <Typography variant="h6">{props.weather} &deg;</Typography>
                <Typography variant="h6" style={{textTransform:'uppercase'}} >{props.description}</Typography>
            </CardContent>
            
            </Card>
         </div>
            
            
        

    )
}


export default WeatherMulti
