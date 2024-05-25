import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseNavbar from "../components/ui/common/Navbar/BaseNavbar";
import SidebarLayout from "../components/ui/common/SideBarLayout/SideBarLayout";
import "./routes.css";
import EmpresaComponent from "../components/screens/Empresa/EmpresaComponent";
import SucursalComponent from "../components/screens/Sucursal/SucursalComponent";
import Categoria from "../components/screens/Categoria/Categoria";
import Inicio from "../components/screens/Inicio/Inicio";
import Insumo from "../components/screens/Insumo/Insumo";
import Producto from "../components/screens/Producto/Producto";
import UnidadMedida from "../components/screens/UnidadMedida/UnidadMedida";

const Rutas: React.FC = () => {
  return (
    <Router>
      <div className="navbar">
        <BaseNavbar />
      </div>
      <Routes>
        <Route path="/" element={<EmpresaComponent />} />
        <Route path="/empresa/:empresaId" element={<SucursalComponent />} />
        <Route element={<SidebarLayout />}>
          <Route path="dashboard/:sucursalId" element={<Inicio />} />
          <Route path="/empresa/:empresaId" element={<SucursalComponent />} />
          <Route path="productos/:sucursalId" element={<Producto />} />
          <Route path="promociones/:sucursalId" element={<Producto />} />
          <Route path="categorias/:idSucursal" element={<Categoria />} />
          <Route path="insumos/:sucursalId" element={<Insumo />} />
          <Route path="/unidadMedida" element={<UnidadMedida />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rutas;
