import isOnline from 'is-online';
import http from 'http';


class Cloudflare {

    private xAuthKey: string;
    private xAuthEmail: string;
    private internetStatus: boolean;
    private ipPublica: string;


    constructor() {
        this.xAuthKey = process.env.XAUTHKEY || '';
        this.xAuthEmail = process.env.XAUTHEMAIL || '';
        this.internetStatus = false;
        this.ipPublica = '';
    }

    public comprobarConexion() {

        isOnline().then((online: boolean) => {
            if (online) {
                this.actualizarIps();
            } else {
                console.log('No hay internet.');
            }
        });

    }

    private actualizarIps() {

        http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' },
            (resp) => {
                resp.on('data', (ip: string) => {
                    this.setIpPublica(`${ip}`);
                });
            });

    }

    private setIpPublica(ipPublica: string): void {
        this.ipPublica = ipPublica;
        console.log(`Ip pública actual: ${ipPublica}`);
        this.obtenerDominios();
    }

    private obtenerDominios() {
        const fetch = require('node-fetch');

        fetch("https://swapi.co/api/people/3")
            .then(promesaFetch => promesaFetch.json())
            .then(contenido => console.log(contenido));
    }


}

export default Cloudflare;