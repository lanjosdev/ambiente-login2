// Funcionalidades / Libs:
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { USER_LOGIN } from "../API/userApi";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

// Estilo:
import './login.scss';

// Assets:
import Logo from '../assets/LOGO-BIZSYS_preto.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';


export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showSenha, setShowSenha] = useState(false);
  
    const navigate = useNavigate();

    // useEffect(()=> {
    //   if(Cookies.get('token')) {
    //     navigate('/home');
    //   }
    // }, [navigate])

    async function handleSubmitLogin(e) {
        e.preventDefault();      

        if (user !== '' && password !== '') {
          await USER_LOGIN(user, password)
          .then((res)=> {
            Cookies.set('token', res, { expires: 1 });
            toast.success('LOGIN SUCCESS');
            setUser('');
            setPassword('');
            navigate('/home', { replace: true });
          })
          .catch((error)=> {
            toast.error("LOGIN INVÁLIDO!");
            console.log('DEU ERROOOOO NO LOGIN');
            console.log(error);
          })
          // try {
          //   await USER_LOGIN(user, password).then(res => Cookies.set('token', res, { expires: 1 }));
          //   toast.success('LOGIN SUCCESS');
          //   navigate('/home');

          // } catch(err) {
          //   toast.error("LOGIN INVALIDO!");
          //   console.log(err)
          // }

          // setUser('');
          // setPassword('');
        }
    } 
  
    return (
      <main className='login-container'>
        <div className="grid">
  
          <h1><img src={Logo} alt="Logotipo" /></h1>
          <p>Faça seu login no ambiente</p>
  
          <form onSubmit={handleSubmitLogin} autoComplete="off">
            <div className="input-div">
                <AiOutlineUser/>
                <input
                  type="text"
                  placeholder='Usuário'
                  value={user}
                  onChange={(e)=> setUser(e.target.value)}
                  required
                />
            </div>

            <div className="input-div">
                <AiOutlineLock/>
                <input
                  type={showSenha ? 'text' : 'password'}
                  placeholder='Senha'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                />
            </div>
  
            <div className="show-senha">
              <input
                type="checkbox"
                id='showSenha'
                onClick={()=> setShowSenha(!showSenha)}
              />
              <label htmlFor="showSenha">Mostrar senha</label>
            </div>
  
            <button type='submit'>Entrar</button>
          </form>

  
        </div>  
      </main>
    );

}