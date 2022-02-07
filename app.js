require('dotenv').config();

const fetch = require('node-fetch');

const obtenerDominios = async () => {

    const response = await fetch('https://api.cloudflare.com/client/v4/zones', {
        method: 'get',
        headers: {
            'x-auth-key': process.env.XAUTHKEY,
            'x-auth-email': process.env.XAUTHEMAIL
        }
    });

    const data = await response.json();

    for(let i = 0; i < data.result.length; i++){
        console.log('Dominio: ', data.result[i].name);
    }
}

obtenerDominios();