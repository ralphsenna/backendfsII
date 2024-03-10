import express from 'express';
import cors from 'cors';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaLogin from './Rotas/rotaLogin.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Seguranca/autenticacao.js';

const host='0.0.0.0';
const porta='3000';

dotenv.config();
//console.log(process.env);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000*60*6          //tempo em milisegundos
}))

app.use('/login',rotaLogin);
app.use('/categoria', verificarAcesso, rotaCategoria); // vefificar acesso passa a ser middleware = camada do meio
app.use('/produto', verificarAcesso, rotaProduto);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
