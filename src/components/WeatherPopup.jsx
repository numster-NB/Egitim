import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import WeatherMulti from './WeatherMulti'
import CancelIcon from '@material-ui/icons/Cancel';

var moment = require('moment');

const useStyles = theme=>({
    popup:{
        position:'fixed',
        width:'100%',
        height:'100%',
        top:'0',
        right:'0',
        bottom:'0',
        left:'0',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    inner:{
        position:'absolute',
        top:'25%',
        right:'15%',
        bottom:'25%',
        left:'15%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        
        background: 'linear-gradient(to right, #1A2980, #26D0CE)',
        borderRadius:'10px'
    },
    items:{
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
    },
   clsItem:{
       marginRight:'15px',
       marginBottom:'10px',
       marginTop:'10px',
       order:'-1',
       alignSelf:'flex-end',
       color: theme.palette.error.dark,
       cursor:'pointer'
   }
    

})


class WeatherPopup extends Component {
    
     
      callCelcius=(temp)=>{
        let cel=Math.floor(temp-273.15);
        return cel
    }
    render() {
        const {classes,dailyData,close}=this.props;
        
        
        var weekday=[]
       dailyData.map(reading=>{return weekday.push(reading.dt*1000) });
        

        return (
            <div className={classes.popup}>
                <div className={classes.inner}>
                
                
                <div className={classes.items}>
                    <WeatherMulti
                    weather={this.callCelcius(dailyData[0].main.temp)}  
                    description={dailyData[0].weather[0].description}
                    icon={dailyData[0].weather[0].id}
                    day={moment(weekday[0]).format('dddd')}
                    
                    />
                  
                  
                  <WeatherMulti
                  weather={this.callCelcius(dailyData[1].main.temp)}  
                  description={dailyData[1].weather[0].description}
                  icon={dailyData[1].weather[0].id}
                  day={moment(weekday[1]).format('dddd')}
                  />
                  
                  
                  <WeatherMulti
                  weather={this.callCelcius(dailyData[2].main.temp)}  
                  description={dailyData[2].weather[0].description}
                  icon={dailyData[2].weather[0].id}
                  day={moment(weekday[2]).format('dddd')}
                  />
                  
                  
                  <WeatherMulti
                  weather={this.callCelcius(dailyData[3].main.temp)}  
                  description={dailyData[3].weather[0].description}
                  icon={dailyData[3].weather[0].id}
                  day={moment(weekday[3]).format('dddd')}
                  />
                  
                  
                  <WeatherMulti
                  weather={this.callCelcius(dailyData[4].main.temp)}  
                  description={dailyData[4].weather[0].description}
                  icon={dailyData[4].weather[0].id}
                  day={moment(weekday[4]).format('dddd')}
                  />
                  </div>
                    <CancelIcon  onClick={close} className={classes.clsItem} />
                </div>
            </div>
        )
    }
}


export default withStyles(useStyles)(WeatherPopup);