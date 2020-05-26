import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {//Copyright süslü parantezlerde yazıldı sonraki kelimeden önce boşluk bırakmak için
    return (
        <Typography variant="body2" style={{color: 'black'}} align="center" >
        {'Copyright © '} 
            <Link style={{color: 'black'}} href="https://www.google.com/" target="" >
                numanbirlik.com
            </Link>{' '}
            { new Date().getFullYear() } 
            {'.'}
        </Typography>
    )
}

export default Copyright;
