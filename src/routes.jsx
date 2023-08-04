// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Login from "./pages/login";
import Home from "./pages/home";

// Components:
import PrivateRoute from "./components/PrivateRoute";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />

            <Route path="/home" element={ <PrivateRoute> <Home/> </PrivateRoute> } />
            {/* <Route path="/home" element={ <Home/> } /> */}
        </Routes>
    )
}