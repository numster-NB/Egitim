import React,{useState,useEffect} from 'react'
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modal';

const toFirstCharUppercase = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1)
const useStyles = theme=>({
    "@global":{
        body:{
            background: "linear-gradient(to right, #74ebd5, #ACB6E5)"
        }
    },
    image:{
        width:'20rem',
        height:'20rem'
    }
})

const Pokemon= (props) => {

    const {classes} = props
    const pokemonId=props.match.params.id

    const [pokemon,setPokemon]=useState()
    useEffect(() => {
        const fetchData=  ()=>{
            axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response)=>{
                const {data} =response;
                setPokemon(data);
            })
            .catch(error=>setPokemon(false))
        }
        fetchData();
    }, [pokemonId])

    const getPokemonJSX=()=>{
        const {name, id, species, height, weight, types, sprites} = pokemon
        const fullImageUrl=`https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        return(
            <div>
            <Typography variant="h3">
             {`${id}. ${toFirstCharUppercase(name)} `}
            </Typography>
            <img className={classes.image} src={fullImageUrl} />
            <Typography>
                Pokemon Info
            </Typography>
            <Typography>
                {"Species: "}
                <a href={species.url} >{species.name}</a>
            </Typography>
            <Typography>Height: {height}</Typography>
            <Typography>Weight: {weight}</Typography>
            <Typography variant="h6" >Types:</Typography>
            {
                types.map(typeInfo=>{
                    const {type} = typeInfo;
                    const {name} = type;
                    return <Typography key={name} >{`${name}`}</Typography>
                })
            }
            </div>
        )
    }
    return (
        <div>
        {pokemon === undefined && <Modal  />}
        {pokemon !== undefined && pokemon && getPokemonJSX()}
        {pokemon ===false && <Typography>Pokemon is not found</Typography>}
        {pokemon !== undefined && (
            <Button color="primary" component={Link} to="/pokedex"  variant="contained" >
                Back to pokedex
            </Button>
        )}
        </div>
    )
}

export default withStyles(useStyles)(Pokemon);
