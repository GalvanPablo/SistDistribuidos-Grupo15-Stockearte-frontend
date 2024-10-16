// Manejo de Datos globales
import { useSelector } from 'react-redux';

// Navegacion
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layout
import { NavBar, SideBar } from './ui/layout';

// Paginas
import {
    Auth,
    Tienda, NuevaTienda, DetalleTienda,
    Producto, NuevoProducto, DetalleProducto,
    Usuario, NuevoUsuario, DetalleUsuario,
    OrdenCompra, NuevaOrdenCompra, DetalleOrdenCompra,
    Novedad,
    Catalago, DetalleCatalago,
    Informes
} from './ui/pages';

import { API_AUTH } from './data/api';

import './App.css';
function App() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const rol = useSelector(state => state.auth.rol);
    const deCentral = useSelector(state => state.auth.rol) === API_AUTH.ROLES[1];

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
                                <Route path='/auth' element={<Navigate to={deCentral ? "/tiendas" : "/productos"} />} />
                                <Route path='/' element={<Navigate to={deCentral ? "/tiendas" : "/productos"} />} />

                                {deCentral ? (
                                    <>
                                        <Route path='/tiendas' element={<Tienda />} />
                                        <Route path='/tiendas/nueva' element={<NuevaTienda />} />
                                        <Route path="/tiendas/tienda/:id" element={<DetalleTienda />} />

                                        <Route path='/usuarios' element={<Usuario />} />
                                        <Route path='/usuarios/nueva' element={<NuevoUsuario />} />
                                        <Route path='/usuarios/usuario/:id' element={<DetalleUsuario />} />

                                        <Route path='/novedades' element={<Novedad />} />
                                    </>
                                ) : (
                                    <>
                                        <Route path='/ordenesDeCompra' element={<OrdenCompra />} />
                                        <Route path='/ordenesDeCompra/nueva' element={<NuevaOrdenCompra />} />
                                        <Route path='/ordenesDeCompra/detalle/:id' element={<DetalleOrdenCompra />} />

                                        <Route path='/catalogo' element={<Catalago />} />
                                        <Route path='/catalogo/detalle/:id' element={<DetalleCatalago />} />
                                    </>
                                )}

                                <Route path='/informes' element={<Informes />} />

                                <Route path='/productos' element={<Producto />} />
                                <Route path='/productos/nueva' element={<NuevoProducto />} />
                                <Route path="/productos/producto/:codigoProducto/:idTienda" element={<DetalleProducto />} />

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
