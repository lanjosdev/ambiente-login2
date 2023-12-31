import axios from 'axios'
// const api = require('../config.json');
import { api_url } from './api';


export const API_URL = api_url;

//End-Points de USUÁRIO
//Logar usuário
export async function USER_LOGIN(email, password) {
   const response = await axios.post(API_URL + "api/login", {
      "email": email,
      "password": password,
   })
   
   const token = response.data.data.token;
   return token; 
   //Nessa response vem o token que precisa ser salvo em localStorage ou cookies pra manter o usuário autenticado.
}

//Lista todos os Usuários cadastrados
export async function USER_GET_ALL(token) {
   const response = await axios.get(API_URL + "api/user", { headers: { Authorization: "Bearer " + token } })

   console.log(response)
}

//Encontrar usuário por string
export async function USER_FIND_BY_STRING(text, token) {
   const response = await axios.get(API_URL + `api/user/find/${text}`, { headers: { Authorization: "Bearer " + token } })

   console.log(response)
}

//Encontrar usuário por ID
//CONFIRMAR COM O RENATO SE O IDENTIFICADOR É NUMBER OU STRING COMO APONTA NA DOCUMENTAÇÃO
export async function USER_FIND_BY_ID(id, token) {
   const response = await axios.get(API_URL + `api/user/find${id}`, { headers: { Authorization: "Bearer " + token } })

   console.log(response)
}