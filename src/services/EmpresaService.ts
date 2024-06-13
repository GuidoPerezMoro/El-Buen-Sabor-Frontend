// Importamos el tipo de dato IEmpresa y la clase BackendClient
import IEmpresa from "../types/IEmpresa";
import EmpresaPost from "../types/post/EmpresaPost";
import  BackendClient  from "./BackendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API
export default class EmpresaService extends BackendClient<IEmpresa | EmpresaPost> {}