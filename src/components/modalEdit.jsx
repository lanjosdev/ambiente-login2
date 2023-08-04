// Funcionalidades / Libs:
import { useState } from "react";
import PropTypes from "prop-types";


// Assets:
// import Thumb from '../assets/thumbModal.jpg';

// Estilo:
import './modal.scss';

export function ModalEdit({ closeModal, file, dimension, type }) {
    const [fileMedia, setFileMedia] = useState();
    const [callDelete, setCallDelete] = useState(false);
    // console.log('modal edit');
    // console.log(midia);

    async function handleSubmit(e) {
        e.preventDefault(); 
    }

    return (
        <div className="modal-background">

            <form className="modal-container" onSubmit={handleSubmit}>
                <a className='btn-close' onClick={() => closeModal(false)}>X</a>
                
                <h2>Editar mídia</h2>

                <div className="config-midia">
                    {type === 1 ? (
                        <img src={"https://samsungflip.bizsys.com.br/storage/" + file} alt="" />
                    ) : (
                        <video controls>
                            <source src={"https://samsungflip.bizsys.com.br/storage/" + file} type="video/mp4" />
                        </video>
                    )}                                       

                    <div className='info-midia'>
                        <div className="file">
                            <h3>Informações da mídia:</h3>

                            <div className="details-midia">
                                <p>Tipo da mídia: <span>{type === 1 ? `Imagem (formato)` : `Vídeo (formato)`}</span></p>
                                <p>Dimensão: <span>{dimension}</span></p>
                            </div>
                        </div>

                        <div className="edit-name">
                            <div className="change-file">
                                <label>Substituir arquivo: </label>
                                <input
                                    type="file" 
                                    name="media" 
                                    // value={"https://samsungflip.bizsys.com.br/storage/" + file}
                                    onChange={(e)=> setFileMedia(e.target.files[0])} 
                                    required
                                />
                                <br />
                                <small><em>Arquivos aceitos: imagem(<b>.jpg, .png</b>) e vídeo(<b>.mp4</b>)</em></small>
                                
                                {fileMedia && (
                                    <>
                                        <br />
                                        <small className="resul">
                                            <b>Para confirmar a substituição, basta clicar em "Salvar"</b>
                                        </small>
                                    </>
                                )}
                            </div>
                            
                            {/* <label htmlFor="editMidia">
                                Nome da mídia:
                            </label>
                            <input 
                                type="text" 
                                id="editMidia" 
                                placeholder='Nome que irá aparecer na lista'
                                value={inputMidia}
                                onChange={(e)=> setInputMidia(e.target.value)}
                                required
                                autoComplete='off'
                            /> */}
                        </div>
                    </div>                  
                </div>

                <div className="actions-btn">
                    <a className='btn-cancel' onClick={() => closeModal(false)}>Cancelar</a>
                    <a
                        className='btn-delete'
                        onClick={() => setCallDelete(true)}
                    >Excluir</a>
                    <button className='btn-upload'>Salvar</button>
                </div>

                { callDelete && (
                    <div className="modal-container delete">
                        <div className="confirm-delete">
                            <h3>Certeza que deseja excluir?</h3>
                            <div>
                                <button className="btn-yes">Sim</button>
                                <button onClick={() => setCallDelete(false)}>Não</button>
                            </div>
                        </div>
                    </div>
                ) }
            </form>

        </div>
    );
}

ModalEdit.propTypes = {
    closeModal: PropTypes.func.isRequired,
    file: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    dimension: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
}