import axios from 'axios'
// const api = require('../config.json');
import { api_url } from './api';
import log from "eslint-plugin-react/lib/util/log";

export const API_URL = api_url;

//End-Points de MIDIA
//Adicionar midia
export async function MEDIA_ADD(formData, token) {
    axios({
        method: "post",
        url: API_URL + "api/media",
        crossDomain: true,        
        //withCredentials : true,
        data: formData,
        headers: {
             "Content-Type": "multipart/form-data", 
             "Authorization": "Bearer " + token ,
             'Access-Control-Allow-Origin': '*',
            },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });    
}

//Editar midia
export async function MEDIA_EDIT(id, file, token) {
    
    const response = await axios.post(API_URL + "api/media/edit" + id, {
        "file": file,
        "method": "PATCH"
    },
        { headers: { Authorization: "Bearer" + token, } }
    )

    console.log(response)
}

//Puxar todas as midias ja salvas
export async function MEDIA_CHECK_UPDATE(token, id, check)
{
    const data = {
        id:id,
        checked:check
    };
    await axios.post(API_URL + "api/media/check",
        data,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then((response) =>{
            console.log(response.data);
        });
}

//Puxar todas as midias ja salvas
export async function MEDIA_GET_ALL(token) {
    const response = await axios.get(API_URL + "api/media", { headers: { Authorization: "Bearer " + token } })

    const midiasSalvas = response.data.data.data; // puxa a array de midias da API
    return midiasSalvas;
}

//Encontrar midia por string
export async function MEDIA_FIND_BY_STRING(text, token) {
    const response = await axios.get(API_URL + `api/media/${text}`, { headers: { Authorization: "Bearer " + token } })

    console.log(response)
}

//Puxar midia por ID
export async function MEDIA_GET_BY_ID(id, token) {
    const response = await axios.get(API_URL + `api/media/${id}`, { headers: { Authorization: "Bearer " + token } })

    console.log(response)
}

