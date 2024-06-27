// Rutas.tsx
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BaseNavbar from "../components/ui/common/Navbar/BaseNavbar";
import SidebarLayout from "../components/ui/common/SideBarLayout/SideBarLayout";
import CallbackPage from "../components/auth/CallbackPage";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken";
import RutaPrivada from "../components/RutaPrivada/RutaPrivada";
import Login from "../components/screens/Login/Login";
import EmpresaComponent from "../components/screens/Empresa/EmpresaComponent";
import SucursalComponent from "../components/screens/Sucursal/SucursalComponent";
import Inicio from "../components/screens/Inicio/Inicio";
import Insumo from "../components/screens/Insumo/Insumo";
import Producto from "../components/screens/Producto/Producto";
import Categoria from "../components/screens/Categoria/Categoria";
import Promocion from "../components/screens/Promocion/Promocion";
import Empleado from "../components/screens/Empleado/Empleado";
import UnidadMedida from "../components/screens/UnidadMedida/UnidadMedida";

const Rutas: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const getToken = useAuthToken();
  const [token, setToken] = useState<string | null>(null);
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = await getToken();
        setToken(authToken);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [getToken, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  localStorage.setItem("usuario", JSON.stringify(user));
  console.log("User:", user);
  console.log("Token:", token);

  const userRoles =
    user && user[`${audience}/roles`] ? user[`${audience}/roles`] : [];

  return (
    <>
      {isAuthenticated && (
        <div className="navbar">
          <BaseNavbar />
        </div>
      )}
      <Routes>
        <Route path="/callback" element={<CallbackPage />} />
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/empresa" />} />
            <Route
              path="/empresa"
              element={
                <RutaPrivada
                  component={EmpresaComponent}
                  roles={["ADMIN", "SUPERADMIN"]}
                />
              }
            />
            <Route
              path="/empresa/:empresaId"
              element={
                <RutaPrivada
                  component={SucursalComponent}
                  roles={["ADMIN", "SUPERADMIN"]}
                />
              }
            />
            <Route path="/" element={<SidebarLayout />}>
              <Route
                path="/dashboard/:sucursalId"
                element={
                  <RutaPrivada
                    component={Inicio}
                    roles={["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/insumos/:sucursalId"
                element={
                  <RutaPrivada
                    component={Insumo}
                    roles={["EMPLEADO", "ADMIN", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/productos/:sucursalId"
                element={
                  <RutaPrivada
                    component={Producto}
                    roles={["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/unidadMedida/:sucursalId"
                element={
                  <RutaPrivada
                    component={UnidadMedida}
                    roles={["ADMIN", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/categorias/:sucursalId"
                element={
                  <RutaPrivada
                    component={Categoria}
                    roles={["ADMIN", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/promociones/:sucursalId"
                element={
                  <RutaPrivada
                    component={Promocion}
                    roles={["ADMIN", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/empleados/:sucursalId"
                element={
                  <RutaPrivada
                    component={Empleado}
                    roles={["ADMIN", "SUPERADMIN"]}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/empresa" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Rutas;
