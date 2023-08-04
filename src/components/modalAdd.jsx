// Funcionalidades / Libs:
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

import { MEDIA_ADD } from "../API/mediaApi";

// Assets:
// import Thumb from '../assets/thumbModal.jpg';

// Estilo:
import './modal.scss';

export function ModalAdd({ closeModal }) {
    const [fileMedia, setFileMedia] = useState();
    // const [nameMedia, setNameMedia] = useState('');


    async function handleMediaAdd(e) {
        e.preventDefault(); 

        const token = Cookies.get('token');

        const formData = new FormData();
        formData.append('file', fileMedia);
        

        let mediaType = 0;
        if(fileMedia.type === "video/mp4") {
            mediaType = 2;
        } else {
            mediaType = 1;
        }
        formData.append('mediaType', mediaType);

        try {
            
            await MEDIA_ADD(formData, token).then(res => console.log(res))
            toast.success('Upload realizado com sucesso!');
        } catch(err) {
            console.log("Caiu no erro err")
        }
        
        // .then(()=> {
        //     console.log(fileMedia);
        // })
        // .catch((error)=> {
        //     console.log('DEU ERRRROO');
        //     console.log(error);
        // })
    }

    return (
        <div className="modal-background">

            <form className="modal-container" onSubmit={handleMediaAdd}>
                <a className='btn-close' onClick={() => closeModal(false)}>X</a>
                
                <h2>Adicionando mídia</h2>

                <div className="config-midia">
                    {/* <img src={Thumb} alt="Thumbmail da mídia"/> */}

                    <div className='info-midia'>
                        <div className="file">
                            <h3>Informações do arquivo selecionado:</h3>

                            <div className="select-file">
                                <label>Arquivo: </label>
                                <input
                                    type="file"
                                    name="media"
                                    onChange={(e)=> setFileMedia(e.target.files[0])}
                                    style={{color: !fileMedia && 'red'}}
                                    required
                                />
                                <br />
                                <small><em>Arquivos aceitos: imagem(<b>.jpg, .png</b>) e vídeo(<b>.mp4</b>)</em></small>

                                {fileMedia && (
                                    <>
                                        <br />
                                        <small className="resul">
                                            <b>Tudo certo para adicionar a mídia! Basta clicar em "Salvar"</b>
                                        </small>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="edit-name">
                            <p>Mídia selecionda: <span>{fileMedia && fileMedia.name}</span></p>

                            <p>Tamanho: <span>{fileMedia && fileMedia.size + " bytes"}</span></p>

                            {/* <input 
                                type="text" 
                                id="editMidia" 
                                placeholder='Nome que irá aparecer na lista'
                                value={nameMedia}
                                onChange={(e)=> setNameMedia(e.target.value)}
                                required
                                autoComplete='off'
                            /> */}
                        </div>
                    </div>                  
                </div>

                <div className="actions-btn">
                    <a className='btn-cancel' onClick={() => closeModal(false)}>Cancelar</a>
                    <button type='submit' className='btn-upload'>Salvar</button>
                </div>
            </form>

        </div>
    );
}

ModalAdd.propTypes = {
    closeModal: PropTypes.func.isRequired,
}