import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseNavbar from '../components/ui/common/Navbar/BaseNavbar';
import SidebarLayout from '../components/ui/common/SideBarLayout/SideBarLayout';
import './routes.css'
import EmpresaComponent from '../components/Screens/Empresa/EmpresaComponent';
import SucursalComponent from '../components/Screens/Sucursal/SucursalComponent';
import Inicio from '../components/Screens/Inicio/Inicio';
import Insumo from '../components/Screens/Insumo/Insumo';
import Producto from '../components/Screens/Producto/Producto';
import UnidadMedida from '../components/Screens/UnidadMedida/UnidadMedida';
import Categoria from '../components/Screens/Categoria/Categoria';
import { Promocion } from '../components/Screens/Promocion/Promocion';

const Rutas: React.FC = () => {
  return (
    <Router>
      <div className='navbar'>
        <BaseNavbar />
      </div>
      <Routes>
        <Route path="/" element={<EmpresaComponent />} />
        <Route path="/empresa/:empresaId" element={<SucursalComponent />} />
          <Route element={<SidebarLayout />}>
          <Route path="dashboard/:sucursalId" element={<Inicio />} />
          <Route path="/empresa/:empresaId" element={<SucursalComponent />} />
          <Route path="productos/:sucursalId" element={<Producto />} />
          <Route path="promociones/:sucursalId" element={<Promocion />} />
          <Route path="categorias/:idSucursal" element={<Categoria />} />
          <Route path="insumos/:sucursalId" element={<Insumo />} />
          <Route path="/unidadMedida" element={<UnidadMedida />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Rutas;
