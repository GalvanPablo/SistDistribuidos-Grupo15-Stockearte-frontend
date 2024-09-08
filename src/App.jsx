// Manejo de Datos globales
import { useSelector } from 'react-redux';

// Navegacion
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layout
import { NavBar, SideBar } from './ui/layout';

// Paginas
import { Auth, Tienda, DetalleTienda, Producto, Usuario } from './ui/pages';

import './App.css';
function App() {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <div className='web__container'>
                    <NavBar />
                    <div className='container'>
                        <SideBar />
                        <div className='view__container'>
                            <Routes>
                                {/* Home */}
                                <Route path='/auth' element={<Navigate to="/tiendas" />} />
                                <Route path='/' element={<Navigate to="/tiendas" />} />

                                <Route path='/tiendas' element={<Tienda />} />
                                <Route path="/tiendas/tienda/:id" element={<DetalleTienda />} />

                                <Route path='/productos' element={<Producto />} />

                                <Route path='/usuarios' element={<Usuario />} />

                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='*' element={<Navigate to="/auth" />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
