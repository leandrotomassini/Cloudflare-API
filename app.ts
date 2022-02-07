
import  dotenv  from 'dotenv';
import Cloudflare from './models/cloudflare';
dotenv.config();

const cloudflare = new Cloudflare();

cloudflare.comprobarConexion();



