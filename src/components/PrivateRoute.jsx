// Funcionalidades / Libs:
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";


// const useAuth = () => {
//     let isLogged = Cookies.get('token') !== undefined && true;
//     return isLogged && isLogged
// }

// const PrivateRoute = () => {
//     const isAuth = useAuth();
//     return isAuth ? (<Outlet/>) : <Navigate to="/" />
// }

// export default PrivateRoute;

export default function PrivateRoute({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function checkLogin() {
            const tokenCookie = Cookies.get('token');

            if(tokenCookie) {
                // se tiver user logado (com token)...
                setIsLogged(true);
                setLoading(false);
            } else {
                Cookies.remove('token');
                setIsLogged(false);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);


    return (
        <>
        {loading ? (
            <h1 className='title-loading'>Carregando...</h1>
        ) : (
            isLogged ? (
                // retorna o filho, no caso o que está dentro (rota admin) do componente "PrivateRouter"
                children
            ) : (
                // se não estiver logado volta pra tela home
                <Navigate to='/' />
            )
        )}
        </>
    )
}

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired,
}