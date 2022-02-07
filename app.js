require('dotenv').config();

const fetch = require('node-fetch');


const obtenerMiIpPublica = () => {

    const http = require('http');
    let ipPublica;

    ipPublica = http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, function (resp) {
        resp.on('data', function (ip) {
            ipPublica = `${ip}`;
            obtenerDominios(ipPublica);
        });
    });
}

const obtenerDominios = async (ipPublica) => {

    const response = await fetch('https://api.cloudflare.com/client/v4/zones', {
        method: 'get',
        headers: {
            'x-auth-key': process.env.XAUTHKEY,
            'x-auth-email': process.env.XAUTHEMAIL
        }
    });

    const data = await response.json();

    for (let i = 0; i < data.result.length; i++) {
        obtenerIdZona(data.result[i].name, data.result[i].id, ipPublica);
    }

}

const obtenerIdZona = async (dominio, iddominio, ipPublica) => {

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
    console.log('Id DNS: ', idZonas.result[0].id);
    console.log('Ip del dominio: ', idZonas.result[0].content);
    console.log('Mi ip pública: ', ipPublica);

    if (idZonas.result[0].content != ipPublica) {

        console.log('Las ip no coinciden');
       

        let actualizarIp = await fetch(`https://api.cloudflare.com/client/v4/zones/${iddominio}/dns_records/${idZonas.result[0].id}`, {
            method: 'PUT',
            body: JSON.stringify({
                type: "A",
                name: dominio,
                content: ipPublica,
                ttl: 1,
                proxied: true
            }),
            headers: {
                'x-auth-key': process.env.XAUTHKEY,
                'x-auth-email': process.env.XAUTHEMAIL
            }
        });

        let ipActualizadas = await actualizarIp.json();
        
    }

    console.log();


}


const estadoInternet = () => {

    const internetAvailable = require("internet-available");

    internetAvailable().then(function () {
        obtenerMiIpPublica();
    }).catch(function () {
        console.log("No internet");
    });
}

estadoInternet();