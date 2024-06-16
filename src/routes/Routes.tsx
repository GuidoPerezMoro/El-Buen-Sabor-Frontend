import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseNavbar from '../components/ui/common/Navbar/BaseNavbar';

import './routes.css';
import EmpresaComponent from '../components/Screens/Empresa/EmpresaComponent';
import SucursalComponent from '../components/Screens/Sucursal/SucursalComponent';
import SidebarLayout from '../components/ui/common/SideBarLayout/SideBarLayout';
import Inicio from '../components/Screens/Inicio/Inicio';
import Insumo from '../components/Screens/Insumo/Insumo';
import Producto from '../components/Screens/Producto/Producto';
import UnidadMedida from '../components/Screens/UnidadMedida/UnidadMedida';
import Categoria from '../components/Screens/Categoria/Categoria';
import Promocion from '../components/Screens/Promocion/Promocion';
import Empleado from '../components/Screens/Empleado/Empleado';

const Rutas: React.FC = () => {
  return (
    <>
      <div className='navbar'>
        <BaseNavbar />
      </div>
      <Routes>
        <Route path="/" element={<EmpresaComponent />} />
        <Route path="/empresa/:empresaId" element={<SucursalComponent />} />
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard/:sucursalId" element={<Inicio />} />
          <Route path="/insumos/:sucursalId" element={<Insumo />} />
          <Route path="/productos/:sucursalId" element={<Producto />} />
          <Route path="/unidadMedida/:sucursalId" element={<UnidadMedida />} />
          <Route path="/categorias/:sucursalId" element={<Categoria />} />
          <Route path="/promociones/:sucursalId" element={<Promocion />} />
          <Route path="/empleados/:sucursalId" element={<Empleado />} /> 
        </Route>
      </Routes>
    </>
  );
};

export default Rutas;
