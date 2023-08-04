import axios from 'axios'
import { api_url } from './api';

export const API_URL = api_url;

//End-Points de SEQUENCIA
//Atualiza sequencia
export async function SEQUENCE_UPDATE(sequence, token) {
    const response = await axios.post(API_URL + "api/sequence", sequence,
        { 
            headers: { 
                "Authorization" : "Bearer " + token, 
            }

        }
    )

    console.log(response)
}

