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

    for (let i = 0; i < data.result.length; i++) {
        obtenerIdZona(data.result[i].name, data.result[i].id);
    }

}

const obtenerIdZona = async (dominio, iddominio) => {
    const responseZona = await fetch(`https://api.cloudflare.com/client/v4/zones/${iddominio}/dns_records`, {
        method: 'get',
        headers: {
            'x-auth-key': process.env.XAUTHKEY,
            'x-auth-email': process.env.XAUTHEMAIL
        }
    });

    const idZonas = await responseZona.json();
    console.log('Dominio: ', dominio);
    console.log('Id dominio: ', iddominio);
    console.log('id dns: ', idZonas.result[0].id);
    console.log('ip pública: ', idZonas.result[0].content);
    console.log();
}

obtenerDominios();

