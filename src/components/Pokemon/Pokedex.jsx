import React, {useState, useEffect} from 'react'
import {AppBar,Toolbar,Card,CardContent, Grid, Container, CardMedia,Typography,Paper,TextField,CircularProgress } from '@material-ui/core'
import { fade,withStyles } from '@material-ui/core/styles'
import Spinner from '../Spinner';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '../Modal';

const useStyles=theme=>({
    "@global":{
        body:{
            margin: "0",
            height: "100vh",
            background: "linear-gradient(to right, #74ebd5, #ACB6E5)"
        }
    },
    cardMedia:{
        width:'10rem',
        height:'10rem',
        margin:'auto'
    },
    name:{
        textAlign:'center'
    },
    card:{
        cursor:'pointer',
        transition:theme.transitions.create(
            ['transform'],
            {duration:theme.transitions.duration.complex}
        ),
        '&:hover':{
            
            transform: 'scale(1.1)'
        }
    },
    margin:{
        display:'inline-block',
        backgroundColor:fade(theme.palette.common.white,0.15)
    },
    inner:{
        margin:theme.spacing(1)
    }
})



const  Pokedex = (props) => {
    
    const {classes,history}=props
    const [pokeData,setPokeData]= useState('')
    const [filter,setFilter]=useState('')
    const onChangeHandler=(e)=>{
        setFilter(e.target.value)
    }
     useEffect ( () => {
      const fetchData= async ()=>{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=600`)
        const { results }=response.data
        const newPokemonData={};
        results.forEach((pokemon,index) => {
            newPokemonData[index+1]={
                id:index+1,
                name:pokemon.name,
                sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index+1
                  }.png`
            };
        });
        setPokeData(newPokemonData)
      }
       fetchData();
    },[])


    const toFirstCharUppercase = (name) =>
        name.charAt(0).toUpperCase() + name.slice(1);
    
    const pokemonCard= (pokemonId) =>{
        
        const {id,name,sprite} = pokeData[pokemonId]
        

        return (
            
            <Grid item xs={6} sm={4} md={3} lg={2} key={pokemonId} >
            <Paper elevation={2} >
                <Card className={classes.card} onClick={()=>history.push(`/pokemon/${id}`)}>
                <CardMedia className={classes.cardMedia} image={sprite} />
                                   
                    <CardContent>
                        <Typography className={classes.name} >
                            {`${id}. ${toFirstCharUppercase(name)}`}
                        </Typography>
                    </CardContent>
                </Card>
                </Paper>
            </Grid>
        )
        
        
    }
    return (
        <>
            <AppBar position="static">
                
        
                            <Toolbar>
                                <Container>
                                    <div className={classes.margin}>
                                    <div className={classes.inner}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                        <SearchIcon />
                                        </Grid>
                                        <Grid item>
                                        <TextField onChange={onChangeHandler} id="input-with-icon-grid" label="Search Pokemon..." />
                                        </Grid>
                                    </Grid>
                                    </div>
                                    
                                    </div>
                                </Container>
                                

                            </Toolbar>
                        
                    
                    
                
            </AppBar>
            <Container style={{marginTop:'1rem'}}   >
                {
                    pokeData ? ( <Grid container spacing={2}>
                    {
                        Object.keys(pokeData).map((pokemonId)=>

                            pokeData[pokemonId].name.includes(filter) &&
                            pokemonCard(pokemonId)
                        )
                    }
           
                </Grid>) : (<Modal />)
                
                }
                
            
            </Container>
            
        </>
    )
}

export default withStyles(useStyles)(Pokedex);
