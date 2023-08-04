// Funcionalidades / Libs:
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { MEDIA_CHECK_UPDATE, MEDIA_GET_ALL } from "../API/mediaApi";
import { SEQUENCE_UPDATE } from "../API/sequenceApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Componentes:
import { ModalAdd } from "../components/modalAdd";
import { ModalEdit } from "../components/modalEdit";

// Assets:
import Logo from '../assets/logo_branco_2.png';
import { MdImage, MdVideoLibrary } from 'react-icons/md';

// Estilo:
import './home.scss';



export default function Home() {
  const [listaMidias, setListaMidias] = useState([]);

  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const [fileMidia, setFileMidia] = useState('');
  const [sizeMidia, setSizeMidia] = useState('');
  const [typeMidia, setTypeMidia] = useState();

  const token = Cookies.get('token');
  // const navigate = useNavigate();

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    console.log(result);
    return result;
  };

  useEffect(()=> {
    async function carregaMidias() {
      const tokenUser = Cookies.get('token');

      if(tokenUser) {
        await MEDIA_GET_ALL(tokenUser)
        .then(res => setListaMidias(res));
      } else {
        alert('ERROR TOKEN USER');
      }
    }
    carregaMidias();
  }, []);  
  // console.log(listaMidias);


  async function updateChecked(midia) {
    const newLista = [...listaMidias];

    const n_check = (midia.checked === 1)?0:1;
    newLista.map((item)=> {item.id === midia.id && (item.checked = n_check)});
    setListaMidias(newLista);
    //TODO: enviar pro banco
    await MEDIA_CHECK_UPDATE(token,midia.id,n_check);
  }

  async function updateSequence() {
    let newSequence = {
      sequence: []
    };

    listaMidias.forEach((midia, index)=> {
      newSequence.sequence.push({
        order: index,
        fk_id_media: midia.id
      })
    })

    await SEQUENCE_UPDATE(newSequence, token).then(res => console.log(res))
  }

  function callModalEdit(objeto) {
    // console.log(objeto);
    setFileMidia(objeto.media_link);
    setSizeMidia(objeto.media_dimensions);
    setTypeMidia(objeto.media_type);

    setModalEditIsOpen(true);
  } 

  // function onClickLogout() {
  //   Cookies.remove('token');
  //   navigate('/');
  // }

  
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }

        setListaMidias((prevMidias) =>
          reorder(prevMidias, source.index, destination.index)
        );

        updateSequence();
      }}
    >
      <div className="home-container">

        <header>
          <div className="grid">
             <Link to='/home'><img src={Logo} alt="Logotipo" /></Link>
             <button className='btn-logout'>Sair</button>
          </div>
        </header>

        <main className="dashboard">
          <div className="grid">

          <h1>Bem-vindo(a) a Dashboard</h1>
          <p>Abaixo você pode adicionar, visualizar e editar a ordem da exibição das mídias.</p>

          <div className="painel-midias">
            <div className='cabecalho-midias'>
              <h2>Lista de mídias</h2>
              <button onClick={()=> setModalAddIsOpen(true)}>+ Add mídia</button>
            </div>

            <div className="midias">
              {listaMidias.length === 0 ? (
                <p className="lista-vazia">
                  Nenhuma mídia foi adicionada! <br />
                  <span>
                    (Clique no botão de <b>+ Add mídia</b> para fazer o upload)
                  </span>
                </p>
              ) : ( 
                <>
                <p>
                  Basta arrastar e soltar os itens para ordernar a sequência de exibição das midias:
                </p>
                <Droppable droppableId="list-midias" direction="horizontal">
                  {(droppableProvided) => (
                    <ul
                      {...droppableProvided.droppableProps}
                      ref={droppableProvided.innerRef}
                      className="list-midias"
                    >
                      {listaMidias.map((midia, index) => (
                        <Draggable key={midia.id} draggableId={String(midia.id)} index={index}>
                          {(draggableProvided) => (
                            <li
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.dragHandleProps}
                              className="item-midia"
                            >
                              <div className={midia.checked === 1 ? "midia-content ativa" : "midia-content"} onClick={()=> callModalEdit(midia)} title="Clique p/ + detalhes">
                                {midia.checked === 0 && (
                                  <div className="midia-disable">
                                    <span>Mídia desativada</span>
                                  </div>
                                )}
                                <img src={"https://samsungflip.bizsys.com.br/storage/" + midia.media_thumb} alt={`Thumb da midia`} />
                                
                                <div className="name-midia">
                                  <p>{index + 1 + "º"}</p>
                                  <span>{midia.media_type === 1 ? <MdImage/> : <MdVideoLibrary/>}</span>
                                </div>
                              </div>

                              <input 
                                type="checkbox"
                                id={midia.id}
                                checked={midia.checked}
                                onClick={()=> updateChecked(midia)} 
                                title="Desativa/Ativa"
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {droppableProvided.placeholder}
                    </ul>
                  )}
                </Droppable>
                </>
              )}
            </div>
          </div>
            
          </div>
        </main>

        { modalAddIsOpen && <ModalAdd closeModal={setModalAddIsOpen} /> }
        { modalEditIsOpen && <ModalEdit closeModal={setModalEditIsOpen} file={fileMidia} dimension={sizeMidia} type={typeMidia} /> }
      </div>
    </DragDropContext>
  );
}
