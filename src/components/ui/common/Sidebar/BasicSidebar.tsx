import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  cilArrowLeft,
  cilBarChart,
  cilCart,
  cilFastfood,
  cilPeople,
  cilDollar,
  cilSpeedometer,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarNav,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import SucursalService from "../../../../services/SucursalService";
import ISucursal from "../../../../types/ISucursal";

const BasicSidebar: React.FC = () => {
  const { sucursalId } = useParams<{ sucursalId: string }>();
  const [sucursalNombre, setSucursalNombre] = useState<string>("");
  const [empresaNombre, setEmpresaNombre] = useState<string>("");
  const [rol, setRole] = useState<string>("");
  const url = import.meta.env.VITE_API_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const sucursalService = new SucursalService();

  useEffect(() => {
    const fetchSucursalYEmpresaNombre = async () => {
      try {
        if (sucursalId) {
          const sucursal = await sucursalService.get(
            `${url}/sucursal`,
            parseInt(sucursalId)
          );
          setSucursalNombre(sucursal.nombre);

          if ("empresa" in sucursal) {
            setEmpresaNombre((sucursal as ISucursal).empresa.nombre);
          }
        }
      } catch (error) {
        console.error(
          "Error al obtener el nombre de la sucursal o empresa:",
          error
        );
      }
    };

    fetchSucursalYEmpresaNombre();
  }, [sucursalId]);

  useEffect(() => {
    // Mover la lógica para obtener el rol al useEffect
    const userDataString = localStorage.getItem("usuario");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const rol = userData[`${audience}/roles`];
      console.log("rol", rol[0]);
      setRole(rol[0]);
    }
  }, []);

  return (
    <div>
      <CSidebar
        className="border-end d-flex flex-column"
        style={{ height: "100vh" }}
      >
        <CSidebarNav>
          {["ADMIN", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/empresa`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilArrowLeft} style={{color:'#E66200'}}/>
                Volver
              </Link>
            </CNavItem>
          )}
          <CNavTitle style={{color:'#E66200'}}>
            {empresaNombre} - {sucursalNombre}
          </CNavTitle>
          {["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/dashboard/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilBarChart} style={{color:'#E66200'}}/>
                Estadísticas
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavGroup
              toggler={
                <>
                  <CIcon customClassName="nav-icon" icon={cilFastfood} style={{color:'#E66200'}}/>
                  Productos
                </>
              }
            >
              <CNavItem>
                <Link to={`/productos/${sucursalId}`} className="nav-link">
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>
                  Lista de Productos
                </Link>
              </CNavItem>
              {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
                <CNavItem>
                  <Link to={`/categorias/${sucursalId}`} className="nav-link">
                    <span className="nav-icon">
                      <span className="nav-icon-bullet"></span>
                    </span>
                    Categorías
                  </Link>
                </CNavItem>
              )}
            </CNavGroup>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/promociones/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilDollar} style={{color:'#E66200'}}/>
                Promociones
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "SUPERADMIN"].includes(rol) && (
            <CNavGroup
              toggler={
                <>
                  <CIcon customClassName="nav-icon" icon={cilPeople} style={{color:'#E66200'}}/>
                  Empleados
                </>
              }
            >
              <CNavItem>
                <Link to={`/empleados/${sucursalId}`} className="nav-link">
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>
                  Lista de Empleados
                </Link>
              </CNavItem>
            </CNavGroup>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/insumos/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilCart} style={{color:'#E66200'}}/>
                Insumos
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/unidadMedida/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilSpeedometer} style={{color:'#E66200'}}/>
                Unidad de Medida
              </Link>
            </CNavItem>
          )}
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default BasicSidebar;
