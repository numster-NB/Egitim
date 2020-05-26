import React from 'react'
import {Button,Typography,Card,CardHeader,CardContent,CardActions} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import "../owfont-master/css/owfont-regular.css";

const useStyles = makeStyles({
    root:{
        maxWidth: 345,
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        background: 'linear-gradient(to right, #5C258D, #4389A2)',
        color:'#fff'
    },
    btn:{
        background: 'linear-gradient(to right, #870000, #190A05)'
    }
})

const WeatherComponent= (props) => {
    const classes=useStyles()
    const {city,country,temp_celcius,temp_max,temp_min,description,weatherIcon,getMore} = props;
    const iconUrl=`owf owf-${weatherIcon} owf-5x`
    return (
        <div>
            <Card style={{textAlign:'center'}}  className={classes.root}>
            
                <CardHeader title={`${city}, ${country}`}></CardHeader>
                <CardContent>
                    <i className={iconUrl}></i>
                    <Typography variant="h5">{temp_celcius} &deg;</Typography>
                    {minmaxTemp(temp_min,temp_max)}
                    <Typography variant="h6" style={{textTransform:'uppercase'}} >{description}</Typography>
                </CardContent>
                
                <CardActions >
                    <Button onClick={getMore} size="small" color="secondary" variant="contained" >
                        Get More 
                    </Button>
                </CardActions>
            </Card>
            
        </div>

    )
}
function minmaxTemp(min,max){
    return(
        <Typography variant="h5">{min} &deg; - {max} &deg;</Typography>
    )
}

export default WeatherComponent
