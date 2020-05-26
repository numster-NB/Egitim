import React, { Component } from 'react'
import {Grid,Container} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Navbar from './layout/Navbar';
import WeatherComponent from './components/WeatherComponent'
import {apiConfig} from './folders/apiKeys';
import WeatherPopup from './components/WeatherPopup';
import TodoComponent from './components/TodoComponent';



const useStyles = theme=>({
    "@global":{
        body:{
            margin: "0",
            height: "100vh",
            background: "linear-gradient(to right, #74ebd5, #ACB6E5)"
        }
    },
    
})



 class WelcomeComponent extends Component {

    constructor(){
        super()
        this.state={
            city:undefined,
            country:undefined,
            weatherIcon:undefined,
            main:undefined,
            temp_celcius:undefined,
            temp_max:undefined,
            temp_min:undefined,
            description:undefined,
            error:false,
            dailyData:[],
            showMulti:false
        }
        this.getWeather();
        
    }
    calCelcius(temp){
        let cell=Math.floor(temp-273.15);
        return cell;
    }
    
   

    getWeather= async ()=>{
        
        const api_call= await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Istanbul,tr&appid=${apiConfig}`);
       

        const response = await api_call.json();

        const dailyData=response.list.filter(reading=>reading.dt_txt.includes("12:00:00"))
        

        console.log(response);
        
        this.setState({
            city:response.city.name,
            country:response.city.country,
            temp_celcius:this.calCelcius(dailyData[0].main.temp),
            temp_max:this.calCelcius(dailyData[0].main.temp_max),
            temp_min:this.calCelcius(dailyData[0].main.temp_min),
            description:dailyData[0].weather[0].description,
            weatherIcon:dailyData[0].weather[0].id,
            dailyData: dailyData
        })
        console.log(dailyData);
    }

    getMore=()=>{
           this.setState({
               showMulti: !this.state.showMulti
           })
           
    }
    
    render() {
        
        return (
            
            <div>
                
                <Navbar />

                <Container style={{marginTop:'25px'}} maxWidth="xl">
                    <Grid  justify="space-between"  xs={12} container >
                    
                            <Grid item xs={12} sm={6}>
                                <TodoComponent />
                            </Grid>
                            <Grid item xs={12} sm={2} >
                                <WeatherComponent 
                                city={this.state.city} 
                                country={this.state.country} 
                                temp_celcius={this.state.temp_celcius}
                                temp_max={this.state.temp_max}
                                temp_min={this.state.temp_min}
                                description={this.state.description}
                                weatherIcon={this.state.weatherIcon}
                                getMore={this.getMore}
                                />
                            </Grid>
                
                    </Grid>
                    {
                        this.state.showMulti && 
                        <WeatherPopup close={this.getMore} dailyData={this.state.dailyData} />  
                    }
                </Container>
                </div>
                
           
           
            
        )
    }
}
export default withStyles(useStyles)(WelcomeComponent);