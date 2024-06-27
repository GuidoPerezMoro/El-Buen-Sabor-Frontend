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
  cilLayers,
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
import "./BasicSidebar.css";

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
        style={{ height: "100vh", backgroundColor:'#A0A0A0'}}
      >
        <CSidebarNav>
          {["ADMIN", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/empresa`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilArrowLeft} style={{color:'#FC9300'}}/>
                Volver
              </Link>
            </CNavItem>
          )}

          <div className="nav-divider"></div>
          <CNavTitle style={{color:'#FC9300', marginTop:'5px'}}>
            {empresaNombre} - {sucursalNombre}
          </CNavTitle>
          <div className="nav-divider"></div>
          {["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/dashboard/${sucursalId}`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilBarChart} style={{color:'#FC9300'}}/>
                Estadísticas
              </Link>
            </CNavItem>
          )}
          <div className="nav-divider"></div>
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/promociones/${sucursalId}`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilDollar} style={{color:'#FC9300'}}/>
                Promociones
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/productos/${sucursalId}`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilFastfood} style={{color:'#FC9300'}}/>
                Productos
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/insumos/${sucursalId}`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilCart} style={{color:'#FC9300'}}/>
                Insumos
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/categorias/${sucursalId}`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilLayers} style={{color:'#FC9300'}}/>
                Categorias
              </Link>
            </CNavItem>
          )}
          {["ADMIN", "EMPLEADO", "SUPERADMIN"].includes(rol) && (
            <CNavItem>
              <Link to={`/unidadMedida/${sucursalId}`} className="nav-link" style={{color:'white', border:'1px solid #BCBCBC'}}>
                <CIcon customClassName="nav-icon" icon={cilSpeedometer} style={{color:'#FC9300'}}/>
                Unidad de Medida
              </Link>
            </CNavItem>
          )}
          <div className="nav-divider"></div>
          {["ADMIN", "SUPERADMIN"].includes(rol) && (
            <CNavGroup
              style={{border:'1px solid #BCBCBC'}}
              toggler={
                <>
                  <CIcon customClassName="nav-icon" icon={cilPeople} style={{color:'#FC9300'}}/>
                  <h6 style={{color:'white'}}>Empleados</h6>
                </>
              }
            >
              <CNavItem>
                <Link to={`/empleados/${sucursalId}`} className="nav-link" style={{color:'white'}}>
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>
                  Lista de Empleados
                </Link>
              </CNavItem>
            </CNavGroup>
          )}
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default BasicSidebar;
