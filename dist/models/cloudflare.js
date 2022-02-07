"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_online_1 = __importDefault(require("is-online"));
const http_1 = __importDefault(require("http"));
class Cloudflare {
    constructor() {
        this.xAuthKey = process.env.XAUTHKEY || '';
        this.xAuthEmail = process.env.XAUTHEMAIL || '';
        this.internetStatus = false;
        this.ipPublica = '';
    }
    comprobarConexion() {
        (0, is_online_1.default)().then((online) => {
            if (online) {
                this.actualizarIps();
            }
            else {
                console.log('No hay internet.');
            }
        });
    }
    actualizarIps() {
        http_1.default.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, (resp) => {
            resp.on('data', (ip) => {
                this.setIpPublica(`${ip}`);
            });
        });
    }
    setIpPublica(ipPublica) {
        this.ipPublica = ipPublica;
        console.log(`Ip pública actual: ${ipPublica}`);
        this.obtenerDominios();
    }
    obtenerDominios() {
        const fetch = require('node-fetch');
        fetch("https://swapi.co/api/people/3")
            .then(promesaFetch => promesaFetch.json())
            .then(contenido => console.log(contenido));
    }
}
exports.default = Cloudflare;
//# sourceMappingURL=cloudflare.js.map