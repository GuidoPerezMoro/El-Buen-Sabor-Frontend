import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
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
import "../../../../styles/variables.css";
import styles from "./BasicSidebar.module.css";
import { colors } from "@mui/material";
import EmpresaService from "../../../../services/EmpresaService";

const BasicSidebar: React.FC = () => {
  const { sucursalId } = useParams<{ sucursalId: string }>();
  const [sucursalNombre, setSucursalNombre] = useState<string>("");
  const [empresaNombre, setEmpresaNombre] = useState<string>("");
  const url = import.meta.env.VITE_API_URL;
  const empresaService = new EmpresaService();
  const sucursalService = new SucursalService();
  const [, setEmpresaSucursales] = useState<ISucursal[]>();

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

  console.log(sucursalNombre);

  const fetchSucursalesForEmpresa = async (empresaId: number) => {
    try {
      const empresa = await empresaService.get(
        url + `/empresa/sucursales`,
        empresaId
      );
      setEmpresaSucursales(empresa.sucursales);
    } catch (error) {
      console.error("Error al obtener las sucursales:", error);
      return [];
    }
  };
  return (
    <div>
      <CSidebar
        className="border-end d-flex flex-column"
        style={{ height: "100vh" }}
      >
        <CSidebarNav>
          <CNavTitle>
            {empresaNombre} - {sucursalNombre}
          </CNavTitle>
          <CNavItem>
            <Link to={`/dashboard/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilBarChart}
                style={{ color: "#E66200" }}
              />
              Estadísticas
            </Link>
          </CNavItem>

          <CNavItem>
            <Link to={`/empresa/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilDollar}
                style={{ color: "#E66200" }}
              />
              Sucursales
            </Link>
          </CNavItem>

          <CNavGroup
            toggler={
              <>
                <CIcon
                  customClassName="nav-icon"
                  icon={cilFastfood}
                  style={{ color: "#E66200" }}
                />
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
            <CNavItem>
              <Link to={`/categorias/${sucursalId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Categorías
              </Link>
            </CNavItem>
          </CNavGroup>

          <CNavItem>
            <Link to={`/promociones/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilDollar}
                style={{ color: "#E66200" }}
              />
              Promociones
            </Link>
          </CNavItem>

          <CNavGroup
            toggler={
              <>
                <CIcon
                  customClassName="nav-icon"
                  icon={cilPeople}
                  style={{ color: "#E66200" }}
                />
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
            <CNavItem>
              <Link to={`/roles/${sucursalId}`} className="nav-link">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Roles
              </Link>
            </CNavItem>
          </CNavGroup>
          <CNavItem>
            <Link to={`/insumos/${sucursalId}`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilCart}
                style={{ color: "#E66200" }}
              />
              Insumos
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/unidadMedida`} className="nav-link">
              <CIcon
                customClassName="nav-icon"
                icon={cilSpeedometer}
                style={{ color: "#E66200" }}
              />
              Unidad de Medida
            </Link>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default BasicSidebar;
